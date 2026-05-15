@echo off
echo Starting DevSpectra Application...

echo Starting Backend Server...
start cmd /k "npm run server"

echo Starting Frontend Server...
start cmd /k "npm run dev"

echo Both servers are starting!
echo Frontend will be available at: http://localhost:5175
