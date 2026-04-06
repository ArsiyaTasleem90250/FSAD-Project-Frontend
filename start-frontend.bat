@echo off
REM Start Frontend - React + Vite on port 3000

echo.
echo ========================================
echo Starting React Frontend
echo ========================================
echo Port: 3000
echo Backend URL: http://localhost:2020
echo.

cd /d C:\Users\arshi\OneDrive\Desktop\FSAD-PROJECT-40\student-outcome-platform

echo Installing dependencies (if needed)...
if not exist node_modules (
  call npm install
)

echo.
echo Starting dev server...
echo Ensure backend is running on http://localhost:2020
echo.

call npm run dev

pause
