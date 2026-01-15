import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
)
