@echo off
echo ===================================================
echo   MerchantPulse AI - Razorpay Buildathon 2026 Demo
echo ===================================================
echo.
echo Starting MerchantPulse AI Next.js frontend on http://localhost:3000 ...
start "MerchantPulse Frontend" cmd /k "npm run dev"

echo.
echo Checking Python FastAPI Risk Engine...
if exist "services\risk-engine\main.py" (
    echo Starting FastAPI Risk Engine on http://localhost:8000 ...
    start "FastAPI Risk Engine" cmd /k "cd services\risk-engine && uvicorn main:app --reload --port 8000"
)

echo.
echo Demo services launched successfully!
echo Open http://localhost:3000 in your browser.
pause
