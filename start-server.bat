@echo off
echo Starting local server for Aeris Elwin's Blog...
echo.
powershell.exe -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

