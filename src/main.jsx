import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './StoreToken/auth.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <>
      <App />
    </>
  </AuthProvider>
)
