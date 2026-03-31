import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { NotificationsProvider } from '../context'

const render = (ui, options = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <NotificationsProvider>{children}</NotificationsProvider>,
    ...options
  })

export * from '@testing-library/react'
export { render }
