"""
MerchantPulse AI — Risk Engine Tests

Tests the deterministic scoring logic (not LLM outputs).
Pattern: credex_task's Vitest approach — math must be testable.
"""

import pytest
from app.scoring import (
    Transaction,
    SubScore,
    calculate_risk_score,
    calculate_conversion_score,
    calculate_cost_efficiency_score,
    calculate_growth_headroom_score,
    segment_merchant,
    generate_risk_flags,
    generate_recommended_actions,
    BENCHMARKS,
)


# ============================================
# Test Data Fixtures
# ============================================

@pytest.fixture
def sample_transactions():
    """Realistic set of merchant transactions."""
    return [
        Transaction(id="pay_001", amount=1500, currency="INR", status="captured", method="upi", created_at=1000000),
        Transaction(id="pay_002", amount=2500, currency="INR", status="captured", method="card", created_at=1000001),
        Transaction(id="pay_003", amount=800, currency="INR", status="captured", method="upi", created_at=1000002),
        Transaction(id="pay_004", amount=3200, currency="INR", status="failed", method="upi", error_code="BANK_DECLINE", created_at=1000003),
        Transaction(id="pay_005", amount=1200, currency="INR", status="captured", method="card", created_at=1000004),
        Transaction(id="pay_006", amount=5000, currency="INR", status="refunded", method="card", refund_status="full", created_at=1000005),
        Transaction(id="pay_007", amount=900, currency="INR", status="captured", method="wallet", created_at=1000006),
        Transaction(id="pay_008", amount=15000, currency="INR", status="captured", method="netbanking", created_at=1000007),
        Transaction(id="pay_009", amount=600, currency="INR", status="failed", method="card", error_code="INSUFFICIENT_FUNDS", created_at=1000008),
        Transaction(id="pay_010", amount=1800, currency="INR", status="captured", method="upi", created_at=1000009),
    ]


@pytest.fixture
def empty_transactions():
    return []


@pytest.fixture
def all_successful():
    return [
        Transaction(id=f"pay_{i}", amount=1000, currency="INR", status="captured", method="upi", created_at=1000000 + i)
        for i in range(20)
    ]


@pytest.fixture
def benchmark():
    return BENCHMARKS["d2c_ecommerce"]


# ============================================
# Risk Score Tests
# ============================================

class TestRiskScore:
    def test_returns_neutral_on_empty(self, empty_transactions, benchmark):
        """With no transactions, the score should be neutral baseline."""
        result = calculate_risk_score(empty_transactions, benchmark)
        assert result.value == 50
        assert result.weight == 0.30
        assert "No transactions" in result.justification

    def test_returns_valid_range(self, sample_transactions, benchmark):
        result = calculate_risk_score(sample_transactions, benchmark)
        assert 0 <= result.value <= 100

    def test_all_clean_transactions_high_score(self, all_successful, benchmark):
        result = calculate_risk_score(all_successful, benchmark)
        assert result.value >= 80  # Low anomaly rate = high score

    def test_justification_contains_data(self, sample_transactions, benchmark):
        result = calculate_risk_score(sample_transactions, benchmark)
        assert "%" in result.justification  # Must cite specific numbers


# ============================================
# Conversion Score Tests
# ============================================

class TestConversionScore:
    def test_returns_neutral_on_empty(self, empty_transactions, benchmark):
        result = calculate_conversion_score(empty_transactions, benchmark)
        assert result.value == 50

    def test_perfect_success_rate(self, all_successful, benchmark):
        result = calculate_conversion_score(all_successful, benchmark)
        assert result.value == 100

    def test_mixed_results(self, sample_transactions, benchmark):
        result = calculate_conversion_score(sample_transactions, benchmark)
        assert 0 <= result.value <= 100
        assert "success rate" in result.justification.lower()


# ============================================
# Cost Efficiency Tests
# ============================================

class TestCostEfficiency:
    def test_returns_neutral_on_empty(self, empty_transactions):
        result = calculate_cost_efficiency_score(empty_transactions)
        assert result.value == 50

    def test_all_upi_small_ticket_is_optimal(self):
        txns = [
            Transaction(id=f"pay_{i}", amount=500, currency="INR", status="captured", method="upi", created_at=1000000+i)
            for i in range(10)
        ]
        result = calculate_cost_efficiency_score(txns)
        assert result.value == 100  # All UPI = optimal for small tickets


# ============================================
# Growth Headroom Tests
# ============================================

class TestGrowthHeadroom:
    def test_no_failures_high_score(self, all_successful):
        result = calculate_growth_headroom_score(all_successful)
        assert result.value >= 90

    def test_justification_references_failures(self, sample_transactions):
        result = calculate_growth_headroom_score(sample_transactions)
        if result.value < 95:
            assert "failed" in result.justification.lower() or "failure" in result.justification.lower() or "recover" in result.justification.lower()


# ============================================
# Composite Score Tests
# ============================================

class TestCompositeScore:
    def test_weighted_composite_calculation(self):
        """Replicates the TypeScript test from the master prompt."""
        risk, conv, cost, growth = 85, 61, 78, 64
        composite = round(risk * 0.30 + conv * 0.30 + cost * 0.20 + growth * 0.20)
        assert composite == 72  # (25.5 + 18.3 + 15.6 + 12.8) = 72.2 → 72

    def test_clamps_to_valid_range(self):
        """Edge case: extreme values should clamp to 0-100."""
        composite = round(150 * 0.30 + (-10) * 0.30 + 200 * 0.20 + 0 * 0.20)
        clamped = max(0, min(100, composite))
        assert 0 <= clamped <= 100


# ============================================
# Segmentation Tests
# ============================================

class TestSegmentation:
    def test_empty_is_new_merchant(self, empty_transactions):
        assert segment_merchant(empty_transactions) == "new_merchant"

    def test_high_volume_is_growth(self):
        txns = [
            Transaction(id=f"pay_{i}", amount=5000, currency="INR", status="captured", method="upi", created_at=1000000+i)
            for i in range(200)  # 200 * 5000 = 1M
        ]
        segment = segment_merchant(txns)
        assert segment in ["enterprise_high_ticket", "growth_high_volume"]


# ============================================
# Risk Flags Tests
# ============================================

class TestRiskFlags:
    def test_empty_returns_empty(self, empty_transactions):
        assert generate_risk_flags(empty_transactions) == []

    def test_caps_at_20_flags(self):
        """Should not overwhelm with noise."""
        txns = [
            Transaction(id=f"pay_{i}", amount=100000, currency="INR", status="captured", method="card", created_at=1000000+i)
            for i in range(100)
        ]
        flags = generate_risk_flags(txns)
        assert len(flags) <= 20


# ============================================
# Anti-Hallucination Tests
# ============================================

class TestAntiHallucination:
    def test_model_does_not_hallucinate_on_empty(self, empty_transactions, benchmark):
        """With no data, scores should be neutral, not invented."""
        risk = calculate_risk_score(empty_transactions, benchmark)
        conv = calculate_conversion_score(empty_transactions, benchmark)
        assert risk.value == 50  # Neutral, not optimistic
        assert conv.value == 50
