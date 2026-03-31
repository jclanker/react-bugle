import React from 'react'
import Notifications from '../../src'
import Form from './Form'
import { css, keyframes } from 'styled-components'

const bounce = keyframes({
  '0%, 100%': {
    transform: 'translateY(10px)'
  },
  '50%': {
    transform: 'translateY(-15px)'
  }
})

import { createNotificationStyle } from '../../src'

const styles = {
  customStyle1: {
    ...createNotificationStyle('purple', 'fuchsia'),
    label: (defaults) => ({
      ...defaults,
      color: 'yellow'
    }),
    icon: (defaults) => ({
      ...defaults,
      animation: css`
        ${bounce} 500ms linear infinite
      `
    })
  }
}

const icons = {
  customStyle1: <>🐼</>
}

const App = () => (
  <>
    <Form />
    <Notifications styles={styles} icons={icons} />
  </>
)

export default App
