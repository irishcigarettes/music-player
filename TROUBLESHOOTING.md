# Troubleshooting Local Server

If the localhost server isn't working, try these solutions:

## Option 1: Run PowerShell as Administrator
1. Right-click on PowerShell
2. Select "Run as Administrator"
3. Navigate to this folder: `cd "C:\Users\Dalton\Documents\GitHub\music-player"`
4. Run: `powershell.exe -ExecutionPolicy Bypass -File server.ps1`

## Option 2: Use Simple Server (Recommended)
Double-click `simple-server.bat` - it will automatically try:
- Node.js (if installed)
- Python (if installed)
- Shows helpful error messages if neither is found

## Option 3: Install Node.js (Easiest)
1. Download Node.js from: https://nodejs.org/
2. Install it
3. Double-click `simple-server.bat`
4. It will automatically use Node.js

## Option 4: Use Python
If you have Python installed:
```bash
python -m http.server 3000
```
Then open: http://localhost:3000

## Option 5: Just Open the File Directly
You can open `index.html` directly in your browser. Most features will work, though some advanced features work better with a server.

## Option 6: Use VS Code Live Server
If you have VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Common Issues

### Port Already in Use
If you see "port already in use", either:
- Close the other program using port 3000
- Change the port in `server.ps1` (line 4) to something else like 3001, 4000, etc.

### Firewall Blocking
Windows Firewall might block the server. You may need to allow it through the firewall.

### Permission Denied
Run PowerShell as Administrator (see Option 1 above)

