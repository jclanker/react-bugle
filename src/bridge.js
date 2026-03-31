let _push = null
let _pop = null

export const notificationBridge = {
  push: (notification) => { if (_push) _push(notification) },
  pop: (id) => { if (_pop) _pop(id) },
  _register: (push, pop) => { _push = push; _pop = pop }
}
