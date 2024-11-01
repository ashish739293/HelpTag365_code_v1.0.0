import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app/App'
import './index.css'
import { UserProvider } from './Context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <UserProvider>
      <App />
    </UserProvider>
    </Router>
  </StrictMode>,
)
