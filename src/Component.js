import React from 'react'
import { useNotifications } from './context'

import {
  Container,
  ContainerInner,
  Overlay,
  Notification,
  NotificationInner,
  Button,
  Icon,
  Label,
  ButtonsOuter
} from './styles'

import defaultStyle from './defaultStyle'
import defaultIcons from './defaultIcons'

const NotificationsComponent = ({ styles, icons }) => {
  const { notifications, pop } = useNotifications()

  const notificationList = Object.values(notifications)

  const handleButton = (id, payload) => () => {
    if (payload) payload()
    pop(id)
  }

  const _styles = {
    ...defaultStyle,
    ...styles
  }

  const _icons = {
    ...defaultIcons,
    ...icons
  }

  const isOverlay = notificationList.find(({ blocking }) => Boolean(blocking))
  return (
    <Container $styles={_styles}>
      <ContainerInner $styles={_styles}>
        {isOverlay ? <Overlay $styles={_styles} /> : null}
        {notificationList.map(({ label, id, payload, type, buttons, duration = 5000 }) => (
          <Notification
            $timer={buttons === undefined}
            key={id}
            $styles={_styles[type]}
            $duration={duration}
          >
            <NotificationInner $styles={_styles[type]}>
              {_icons[type] ? (
                <Icon $styles={_styles[type]}>{_icons[type]}</Icon>
              ) : null}
              <Label $styles={_styles[type]}>{label}</Label>
            </NotificationInner>
            {buttons === 'yesNo' ? (
              <ButtonsOuter $styles={_styles[type]}>
                <Button
                  $styles={_styles[type]}
                  $half={true}
                  onClick={handleButton(id, payload)}
                >
                  Yes
                </Button>
                <Button
                  $styles={_styles[type]}
                  $half={true}
                  onClick={handleButton(id)}
                >
                  No
                </Button>
              </ButtonsOuter>
            ) : null}
            {buttons === 'ok' ? (
              <ButtonsOuter $styles={_styles[type]}>
                <Button
                  $styles={_styles[type]}
                  onClick={handleButton(id, payload)}
                >
                  Ok
                </Button>
              </ButtonsOuter>
            ) : null}
          </Notification>
        ))}
      </ContainerInner>
    </Container>
  )
}

export default NotificationsComponent
