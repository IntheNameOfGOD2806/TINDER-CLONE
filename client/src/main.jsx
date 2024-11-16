import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import ThemeConfigGlobal from './themes/global.theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeConfigGlobal>
      <NextUIProvider>
        <main className="text-foreground bg-background">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </main>
      </NextUIProvider>
    </ThemeConfigGlobal>
  </StrictMode>,
)

