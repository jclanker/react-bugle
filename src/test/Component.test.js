/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent } from './helpers'
import 'jest-styled-components'
import '@testing-library/jest-dom'

import Notifications from '../Component'
import { useNotifications } from '../context'

const PushButton = ({ notification }) => {
  const { push } = useNotifications()
  return <button onClick={() => push(notification)}>push</button>
}

const setup = (notification) => {
  render(
    <>
      <PushButton notification={notification} />
      <Notifications />
    </>
  )
  fireEvent.click(screen.getByText('push'))
}

it('default component, no notifications', () => {
  const { container } = render(<Notifications />)
  expect(container.firstChild).toMatchSnapshot()
  expect(screen.queryByText(/Test notification/)).not.toBeInTheDocument()
})

it('should show a notification', () => {
  setup({ id: '1', label: 'Test notification', duration: 99999 })
  expect(screen.queryByText(/Test notification/)).toBeInTheDocument()
  expect(screen.queryByText(/Yes/)).not.toBeInTheDocument()
  expect(screen.queryByText(/No/)).not.toBeInTheDocument()
})

it('should show a yes/no notification', () => {
  setup({ id: '1', label: 'Test notification', buttons: 'yesNo' })
  expect(screen.queryByText(/Test notification/)).toBeInTheDocument()
  expect(screen.queryByText(/Yes/)).toBeInTheDocument()
  expect(screen.queryByText(/No/)).toBeInTheDocument()
})

it('should show a confirmation notification', () => {
  setup({ id: '1', label: 'Test notification', buttons: 'ok' })
  expect(screen.queryByText(/Test notification/)).toBeInTheDocument()
  expect(screen.queryByText(/Yes/)).not.toBeInTheDocument()
  expect(screen.queryByText(/No/)).not.toBeInTheDocument()
  expect(screen.queryByText(/Ok/)).toBeInTheDocument()
})

it('clicking Yes calls payload and removes the notification', () => {
  const payload = jest.fn()
  setup({ id: '1', label: 'Test notification', buttons: 'yesNo', payload })
  fireEvent.click(screen.getByText('Yes'))
  expect(payload).toHaveBeenCalledTimes(1)
  expect(screen.queryByText(/Test notification/)).not.toBeInTheDocument()
})

it('clicking No removes the notification without calling payload', () => {
  const payload = jest.fn()
  setup({ id: '1', label: 'Test notification', buttons: 'yesNo', payload })
  fireEvent.click(screen.getByText('No'))
  expect(payload).not.toHaveBeenCalled()
  expect(screen.queryByText(/Test notification/)).not.toBeInTheDocument()
})

it('clicking Ok calls payload and removes the notification', () => {
  const payload = jest.fn()
  setup({ id: '1', label: 'Test notification', buttons: 'ok', payload })
  fireEvent.click(screen.getByText('Ok'))
  expect(payload).toHaveBeenCalledTimes(1)
  expect(screen.queryByText(/Test notification/)).not.toBeInTheDocument()
})
