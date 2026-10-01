@echo off
echo ========================================================
echo Pushing Chandu Momos Framework to GitHub (radhavinternational-rgb)
echo ========================================================
echo.
cd /d "%~dp0"
git branch -M main
git push -u origin main
echo.
if %errorlevel% neq 0 (
    echo.
    echo If the push failed:
    echo 1. Ensure the repo is created at: https://github.com/new?name=chandu-momos-framework
    echo 2. Check your GitHub permissions.
) else (
    echo [SUCCESS] Repository pushed to: https://github.com/radhavinternational-rgb/chandu-momos-framework
)
pause
