import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react'
import { notificationBridge } from './bridge'

const NotificationsContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'PUSH':
      return {
        ...state,
        [action.notification.id]: action.notification
      }
    case 'POP': {
      const result = {}
      for (let k in state) {
        if (k.toString() !== action.id.toString()) {
          result[k] = state[k]
        }
      }
      return result
    }
    default:
      return state
  }
}

export function NotificationsProvider({ children }) {
  const [notifications, dispatch] = useReducer(reducer, {})
  const timers = useRef({})

  const pop = useCallback((id) => {
    dispatch({ type: 'POP', id })
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const push = useCallback((notification) => {
    dispatch({ type: 'PUSH', notification })
    if (!notification.buttons) {
      const timer = setTimeout(() => {
        dispatch({ type: 'POP', id: notification.id })
        delete timers.current[notification.id]
      }, notification.duration || 5000)
      timers.current[notification.id] = timer
    }
  }, [])

  useEffect(() => {
    notificationBridge._register(push, pop)
    return () => notificationBridge._register(null, null)
  }, [push, pop])

  return (
    <NotificationsContext.Provider value={{ notifications, push, pop }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationsContext)
}
