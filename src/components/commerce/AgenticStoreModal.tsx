'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  ShoppingBag,
  Sparkles,
  Bot,
  Send,
  Check,
  Star,
  ShieldAlert,
  Percent,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { CATALOG_PRODUCTS, Product } from '@/lib/catalog';
import { calculateDynamicDiscount, CustomerProfile, MOCK_CUSTOMER_PROFILES } from '@/lib/smart-discount';
import { RazorpayCheckoutModal } from './RazorpayCheckoutModal';

interface AgenticStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  toolCall?: {
    tool: string;
    args: Record<string, unknown>;
  };
  recommendedProductId?: string;
}

export function AgenticStoreModal({ isOpen, onClose }: AgenticStoreModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([
    { product: CATALOG_PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile>(MOCK_CUSTOMER_PROFILES[0]);

  // Checkout modal state
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState('');

  // Autonomous Agent Chat state
  const [agentInput, setAgentInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [agentMessages, setAgentMessages] = useState<AgentChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello! I am your autonomous shopping & growth agent. I can search our catalog, compare specs across high-margin items, and unlock margin-aware dynamic discounts tailored to your profile.',
    },
  ]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((prod) => {
      const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchQuery =
        searchQuery === '' ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const averageCartMarginPct = useMemo(() => {
    if (cart.length === 0) return 45;
    const totalWeightedMargin = cart.reduce(
      (sum, item) => sum + item.product.marginPct * (item.product.price * item.quantity),
      0
    );
    return Math.round(totalWeightedMargin / cartSubtotal);
  }, [cart, cartSubtotal]);

  // Dynamic discount calculation
  const discountDecision = useMemo(() => {
    return calculateDynamicDiscount(cartSubtotal, averageCartMarginPct, selectedCustomer);
  }, [cartSubtotal, averageCartMarginPct, selectedCustomer]);

  const finalPayableInr = Math.max(0, cartSubtotal - discountDecision.discountAmountInr);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Agent interaction handler
  const handleSendAgentMessage = async (queryText?: string) => {
    const textToSend = queryText || agentInput;
    if (!textToSend.trim()) return;

    const userMsg: AgentChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setAgentMessages((prev) => [...prev, userMsg]);
    if (!queryText) setAgentInput('');
    setIsAgentTyping(true);

    // Simulate Agent Tool Calling & Reasoning
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply: AgentChatMessage;

      if (lower.includes('running') || lower.includes('shoes') || lower.includes('footwear')) {
        const prod = CATALOG_PRODUCTS[0];
        reply = {
          id: `msg_${Date.now() + 1}`,
          sender: 'agent',
          text: `Found the top match: "${prod.name}" (₹${prod.price}). Features carbon-infused midsole, Vibram grip, and maintains a healthy 48% merchant contribution margin. Would you like me to add it to your cart?`,
          toolCall: {
            tool: 'search_catalog',
            args: { category: 'Footwear', max_price: 5500, min_margin: 40 },
          },
          recommendedProductId: prod.id,
        };
      } else if (lower.includes('compare') || lower.includes('hoodie') || lower.includes('tee')) {
        reply = {
          id: `msg_${Date.now() + 1}`,
          sender: 'agent',
          text: `Comparison Matrix:\n• Merino Wool Hoodie: ₹3,499 (52% margin, 220 GSM Australian Merino, anti-odor)\n• HyperBreeze Running Tee: ₹1,499 (60% margin, 85g ultralight, quick-dry)\nRecommendation: Merino Hoodie offers superior thermal regulation and longevity.`,
          toolCall: {
            tool: 'compare_specifications',
            args: { items: ['prod-002', 'prod-006'], criterion: 'performance_vs_margin' },
          },
        };
      } else if (lower.includes('discount') || lower.includes('offer') || lower.includes('coupon')) {
        reply = {
          id: `msg_${Date.now() + 1}`,
          sender: 'agent',
          text: `Calculated dynamic offer for ${selectedCustomer.name} (${selectedCustomer.rfmSegment}): ${discountDecision.rationale} Coupon code: ${discountDecision.couponCode}.`,
          toolCall: {
            tool: 'calculate_dynamic_discount',
            args: {
              rfm_tier: selectedCustomer.rfmSegment,
              churn_prob: selectedCustomer.churnProbability,
              basket_margin: averageCartMarginPct,
            },
          },
        };
      } else {
        reply = {
          id: `msg_${Date.now() + 1}`,
          sender: 'agent',
          text: `I've analyzed our catalog against your profile. Current cart qualifies for ${discountDecision.discountPct}% dynamic discount (Coupon: ${discountDecision.couponCode}) preserving ${discountDecision.marginPreservedPct}% net margin.`,
          toolCall: {
            tool: 'evaluate_cart_unit_economics',
            args: { cart_total: cartSubtotal, margin: averageCartMarginPct },
          },
        };
      }

      setAgentMessages((prev) => [...prev, reply]);
      setIsAgentTyping(false);
    }, 700);
  };

  // Launch Razorpay Order
  const handleInitiateRazorpayCheckout = async () => {
    try {
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPayableInr * 100, // paise
          currency: 'INR',
          receipt: `rcpt_${Date.now().toString().slice(-6)}`,
          customer: {
            name: selectedCustomer.name,
            email: selectedCustomer.email,
          },
          notes: {
            coupon_applied: discountDecision.couponCode,
            margin_preserved: `${discountDecision.marginPreservedPct}%`,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActiveOrderId(data.order.id);
        setIsRazorpayModalOpen(true);
      }
    } catch (e) {
      console.error(e);
      // Fallback order ID
      setActiveOrderId(`order_demo_${Date.now().toString().slice(-6)}`);
      setIsRazorpayModalOpen(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl font-sans text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-7xl h-[92vh] bg-[#07090e] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0080ff] to-[#74f5ff] flex items-center justify-center text-black font-black">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white tracking-wide">PulseCommerce Live Storefront</h2>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Agentic Checkout
                  </span>
                </div>
                <p className="text-[11px] text-white/50">
                  Powered by Razorpay Gateway + Margin-Aware Dynamic Discounting
                </p>
              </div>
            </div>
          </div>

          {/* Customer RFM Selector (For Hackathon Demonstration) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="text-[11px] text-white/40 font-mono">Simulate Customer:</span>
              <select
                value={selectedCustomer.id}
                onChange={(e) => {
                  const c = MOCK_CUSTOMER_PROFILES.find((x) => x.id === e.target.value);
                  if (c) setSelectedCustomer(c);
                }}
                aria-label="Simulate Customer Profile"
                className="bg-transparent text-xs font-semibold text-[#74f5ff] focus:outline-none cursor-pointer"
              >
                {MOCK_CUSTOMER_PROFILES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0b0f19] text-white">
                    {c.name} ({c.rfmSegment})
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#74f5ff]" />
              <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
              {discountDecision.discountPct > 0 && (
                <span className="text-[10px] bg-emerald-500 text-black font-bold px-1.5 py-0.2 rounded-full">
                  -{discountDecision.discountPct}%
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Grid: Products + AI Shopping Agent */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Product Catalog Section (8 cols) */}
          <div className="lg:col-span-8 flex flex-col border-r border-white/10 overflow-hidden">
            {/* Search & Category Tabs */}
            <div className="p-4 border-b border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, materials, specs..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#0080ff]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 text-xs">
                {['All', 'Footwear', 'Apparel', 'Electronics', 'Accessories'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs ${
                      selectedCategory === cat
                        ? 'bg-[#0080ff] text-white font-semibold'
                        : 'bg-white/[0.03] text-white/60 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 relative"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-white/70">
                      {prod.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      Margin: {prod.marginPct}%
                    </span>
                  </div>

                  {/* Icon / Visual representation */}
                  <div className="h-28 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] flex items-center justify-center text-5xl mb-3 group-hover:scale-105 transition-transform duration-300">
                    {prod.image}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-1 text-[11px] text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="font-bold">{prod.rating}</span>
                      <span className="text-white/40">({prod.reviewsCount})</span>
                    </div>
                    <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#74f5ff] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold font-mono text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-white/40 line-through font-mono">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0080ff] to-[#00baf2] hover:opacity-95 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-opacity"
                      >
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Shopping Agent Chat (4 cols) */}
          <div className="lg:col-span-4 flex flex-col bg-[#05070c] overflow-hidden">
            {/* Agent Header */}
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0080ff]/20 border border-[#0080ff]/40 flex items-center justify-center text-[#74f5ff]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Autonomous Commerce Agent</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active · Function Calling Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {agentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.toolCall && (
                    <div className="mb-1 text-[10px] font-mono bg-blue-950/40 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded flex items-center gap-1">
                      <Bot className="w-3 h-3 text-[#74f5ff]" />
                      <span>Executed: {msg.toolCall.tool}()</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0080ff] text-white rounded-br-none'
                        : 'bg-white/[0.05] border border-white/10 text-white/90 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.recommendedProductId && (
                    <button
                      onClick={() => {
                        const p = CATALOG_PRODUCTS.find((x) => x.id === msg.recommendedProductId);
                        if (p) addToCart(p);
                      }}
                      className="mt-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      <span>Add Recommended Item to Cart</span>
                    </button>
                  )}
                </div>
              ))}

              {isAgentTyping && (
                <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono p-2">
                  <span className="w-1.5 h-1.5 bg-[#74f5ff] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#74f5ff] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#74f5ff] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span>Agent orchestrating tools...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Pills */}
            <div className="p-2 border-t border-white/5 bg-white/[0.01] flex flex-wrap gap-1.5 text-[10px]">
              <button
                onClick={() => handleSendAgentMessage('Find running shoes under 5000 with good margin')}
                className="px-2 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 border border-white/10 cursor-pointer"
              >
                👟 Trail shoes &lt; ₹5k
              </button>
              <button
                onClick={() => handleSendAgentMessage('Compare Merino Hoodie vs Running Tee')}
                className="px-2 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 border border-white/10 cursor-pointer"
              >
                ⚖️ Compare Merino vs Tee
              </button>
              <button
                onClick={() => handleSendAgentMessage('Evaluate my customer discount and unit economics')}
                className="px-2 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 border border-white/10 cursor-pointer"
              >
                💡 Best dynamic discount
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02] flex gap-2">
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAgentMessage()}
                placeholder="Ask agent to search, compare, or discount..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0080ff]"
              />
              <button
                onClick={() => handleSendAgentMessage()}
                disabled={!agentInput.trim()}
                className="px-3 py-2 rounded-xl bg-[#0080ff] hover:bg-blue-600 disabled:opacity-40 text-white cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating / Slide-over Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-[#090d16] border-l border-white/10 p-6 flex flex-col justify-between z-30 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#74f5ff]" />
                    <h3 className="font-bold text-sm text-white">Your Cart</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="py-4 space-y-3 max-h-[38vh] overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-xs text-white/40 text-center py-8">Your cart is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-white/[0.03] border border-white/10 rounded-xl p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.product.image}</span>
                          <div>
                            <p className="text-xs font-semibold text-white truncate max-w-[150px]">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] font-mono text-white/50">
                              ₹{item.product.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-white/40 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Margin-Aware Dynamic Discount Card */}
                {cart.length > 0 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0080ff]/10 to-transparent border border-[#0080ff]/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#74f5ff] flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5" />
                        Margin-Aware Smart Offer
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        {discountDecision.couponCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      {discountDecision.rationale}
                    </p>
                    <div className="text-[10px] text-white/40 font-mono flex justify-between pt-1 border-t border-white/10">
                      <span>Preserved Unit Margin:</span>
                      <span className="text-emerald-400 font-bold">{discountDecision.marginPreservedPct}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Summary */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountDecision.discountAmountInr > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Dynamic Discount ({discountDecision.discountPct}%)</span>
                        <span className="font-mono">-₹{discountDecision.discountAmountInr.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Payable</span>
                      <span className="font-mono text-[#74f5ff]">
                        ₹{finalPayableInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleInitiateRazorpayCheckout}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0080ff] to-[#00baf2] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-opacity"
                  >
                    <span>Pay with Razorpay Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Razorpay Standard Checkout Modal */}
        <RazorpayCheckoutModal
          isOpen={isRazorpayModalOpen}
          onClose={() => setIsRazorpayModalOpen(false)}
          orderId={activeOrderId}
          amountInr={finalPayableInr}
          discountInr={discountDecision.discountAmountInr}
          customerName={selectedCustomer.name}
          customerEmail={selectedCustomer.email}
          productName={cart.length > 0 ? cart[0].product.name : 'Cart Items'}
          onPaymentSuccess={(payId) => {
            console.log('Payment completed:', payId);
          }}
        />
      </motion.div>
    </div>
  );
}
