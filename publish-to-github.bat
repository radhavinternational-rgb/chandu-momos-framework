@echo off
title Publish Chandu Momos to GitHub
echo ==========================================================
echo        Publishing Chandu Momos Framework to GitHub
echo ==========================================================
echo.
cd /d "C:\Users\Dell\rohit\chandu-momos-framework"

echo [Step 1/2] Connecting to your GitHub account...
echo A browser tab will open for quick one-click approval.
echo.
"C:\Users\Dell\rohit\bin\gh.exe" auth login --web -h github.com -p https -w

echo.
echo [Step 2/2] Creating repository and pushing all files...
"C:\Users\Dell\rohit\bin\gh.exe" repo create chandu-momos-framework --public --source=. --remote=origin --push

if %errorlevel% equ 0 (
    echo.
    echo ==========================================================
    echo [SUCCESS] All material is now published to GitHub!
    echo Repository: https://github.com/radhavinternational-rgb/chandu-momos-framework
    echo ==========================================================
) else (
    echo.
    echo Retrying push to origin...
    git push -u origin main
)
echo.
pause

