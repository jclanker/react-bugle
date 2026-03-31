import { componentStyles } from './styles'

export const createNotificationStyle = (
  primaryColor = 'black',
  secondaryColor = 'black',
  animateBackground = true
) => ({
  ...componentStyles,
  button: (defaults) => ({
    ...defaults,
    boxShadow: `inset 0 0 20px ${secondaryColor}`,
    ['&:hover']: {
      background: secondaryColor
    }
  }),
  notification: (defaults, { $timer }) => ({
    ...defaults,
    background:
      animateBackground && $timer
        ? `linear-gradient(90deg, ${secondaryColor} 50%, ${primaryColor} 50%)`
        : primaryColor,
    backgroundSize: '200% auto'
  })
})

export const notificationDefaultTheme = {
  success: {
    primaryColor: '#499a4e',
    secondaryColor: '#336c37'
  },
  info: {
    primaryColor: '#5e8bc6',
    secondaryColor: '#4a6e9c'
  },
  error: {
    primaryColor: '#d26b63',
    secondaryColor: '#934b45'
  }
}

const defaultStyles = {
  success: createNotificationStyle(
    notificationDefaultTheme.success.primaryColor,
    notificationDefaultTheme.success.secondaryColor
  ),
  info: createNotificationStyle(
    notificationDefaultTheme.info.primaryColor,
    notificationDefaultTheme.info.secondaryColor
  ),
  error: createNotificationStyle(
    notificationDefaultTheme.error.primaryColor,
    notificationDefaultTheme.error.secondaryColor
  )
}

export default defaultStyles
