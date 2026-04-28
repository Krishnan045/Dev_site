import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("Vite App Bootstrapping...");

try {
  const root = document.getElementById('root');
  if (!root) throw new Error("Root element not found!");
  
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Vite App Rendered.");
} catch (error) {
  console.error("Vite App Crash:", error);
  document.body.innerHTML = `
    <div style="background: #fff5f5; color: #c53030; padding: 40px; font-family: sans-serif; border: 2px solid #feb2b2; border-radius: 8px; margin: 20px;">
      <h1 style="margin-top: 0;">🚀 App Crash Detected</h1>
      <p style="font-size: 18px;"><strong>Error:</strong> ${error.message}</p>
      <pre style="background: #fff; padding: 20px; border-radius: 4px; overflow: auto; border: 1px solid #fed7d7;">${error.stack}</pre>
      <p>Please check the browser console for more details.</p>
    </div>
  `;
}
