import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext'
import './index.css'
import './normalize.css'

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
)
