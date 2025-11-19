@echo off
echo ========================================
echo   Starting Aeris Elwin's Blog Server
echo ========================================
echo.
echo Checking for Node.js...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Node.js found! Starting server...
    echo.
    npx http-server -p 3000 -o
) else (
    echo Node.js not found. Trying Python...
    where python >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo Python found! Starting server...
        echo.
        python -m http.server 3000
        echo.
        echo Server started! Open http://localhost:3000 in your browser
    ) else (
        echo.
        echo ERROR: Neither Node.js nor Python found!
        echo.
        echo Please install one of the following:
        echo 1. Node.js: https://nodejs.org/
        echo 2. Python: https://www.python.org/
        echo.
        echo Or use the PowerShell server: server.ps1
        echo.
    )
)
pause

