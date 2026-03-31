/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { NotificationsProvider, useNotifications } from '../context'
import { notificationBridge } from '../bridge'

const wrapper = ({ children }) => <NotificationsProvider>{children}</NotificationsProvider>

describe('push', () => {
  it('adds a notification', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test', buttons: 'ok' })
    })
    expect(Object.values(result.current.notifications)).toHaveLength(1)
    expect(result.current.notifications['1'].label).toBe('test')
  })

  it('auto-dismisses after duration', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test', duration: 1000 })
    })
    expect(Object.values(result.current.notifications)).toHaveLength(1)
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(Object.values(result.current.notifications)).toHaveLength(0)
    jest.useRealTimers()
  })

  it('uses default duration of 5000ms when duration is not set', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test' })
    })
    act(() => {
      jest.advanceTimersByTime(4999)
    })
    expect(Object.values(result.current.notifications)).toHaveLength(1)
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(Object.values(result.current.notifications)).toHaveLength(0)
    jest.useRealTimers()
  })

  it('does not auto-dismiss when buttons are set', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test', duration: 1000, buttons: 'yesNo' })
    })
    act(() => {
      jest.advanceTimersByTime(60000)
    })
    expect(Object.values(result.current.notifications)).toHaveLength(1)
    jest.useRealTimers()
  })
})

describe('pop', () => {
  it('removes a notification', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test', buttons: 'ok' })
    })
    act(() => {
      result.current.pop('1')
    })
    expect(Object.values(result.current.notifications)).toHaveLength(0)
  })

  it('cancels the auto-dismiss timer', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      result.current.push({ id: '1', label: 'test', duration: 1000 })
    })
    act(() => {
      result.current.pop('1')
    })
    expect(Object.values(result.current.notifications)).toHaveLength(0)
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    // still empty — no double-pop side effects
    expect(Object.values(result.current.notifications)).toHaveLength(0)
    jest.useRealTimers()
  })
})

describe('notificationBridge', () => {
  it('pushes a notification from outside React', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      notificationBridge.push({ id: '1', label: 'test', buttons: 'ok' })
    })
    expect(Object.values(result.current.notifications)).toHaveLength(1)
  })

  it('pops a notification from outside React', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      notificationBridge.push({ id: '1', label: 'test', buttons: 'ok' })
    })
    act(() => {
      notificationBridge.pop('1')
    })
    expect(Object.values(result.current.notifications)).toHaveLength(0)
  })
})
