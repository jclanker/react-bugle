import React from 'react'
import { createRoot } from 'react-dom/client'

import { defaultRebootTheme } from 'styled-reboot'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles.js'
import { NotificationsProvider } from '../../src'

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <ThemeProvider theme={defaultRebootTheme}>
    <NotificationsProvider>
      <GlobalStyle />
      <App />
    </NotificationsProvider>
  </ThemeProvider>
)
