@echo off
REM ============================================
REM FixBike.online - SEO Optimizacija Deploy
REM ============================================

echo.
echo ========================================
echo   FixBike.online - SEO Deploy Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Generisanje favicon.ico...
call npm run favicon:generate
if errorlevel 1 (
    echo NAPOMENA: Favicon generation nije uspio, ali nastavljamo...
)

echo.
echo [2/5] Provjera Git statusa...
git status

echo.
echo [3/5] Dodavanje fajlova u Git...
git add .

echo.
echo [4/5] Git commit...
git commit -m "SEO optimizacija: H1, meta tags, Schema.org Service/Product, WhatsApp integration, favicon, improved alt attributes"

echo.
echo [5/5] Git push na remote...
git push origin main

echo.
echo ========================================
echo   Deploy Zavrsen!
echo ========================================
echo.
echo Vercel ce automatski deployovati sajt.
echo Provjeri: https://fixbike.online/
echo.
echo Za testiranje SEO:
echo - Google Rich Results: https://search.google.com/test/rich-results
echo - Schema Validator: https://validator.schema.org/
echo - PageSpeed: https://pagespeed.web.dev/
echo.

pause
