import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// const headerContainer = document.getElementById('header-container');
// if (headerContainer) {
//   const username = document.getElementById('header-container').dataset.username; // Pass username from PHP
//   createRoot(headerContainer).render(<Header username={username} />);
// }