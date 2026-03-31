# react-bugle

A simple React notification component.

✅ Context-based state management  
✅ Push notifications from inside or outside React components  
✅ Custom styles  
✅ Button controls with optional callback on confirmation  

### Demo

<a href="https://jclanker.github.io/react-bugle/">Open demo</a>

### Installation

```sh
npm install react-bugle
```

### Builds

Four builds are available depending on your needs:

| Import | Icons | styled-components |
| ------ | ----- | ----------------- |
| `react-bugle` | ✅ default icons via `react-icons` | bundled |
| `react-bugle/iconless` | ❌ no icons | bundled |
| `react-bugle/themed` | ✅ default icons via `react-icons` | external (peer) |
| `react-bugle/themed-iconless` | ❌ no icons | external (peer) |

The **themed** builds require `styled-components >=5.1` to be installed in your project. This gives you a single shared instance of styled-components, which is necessary if you want to access your app's theme values in custom styles via `props.theme`.

The default builds bundle styled-components, so no extra install is needed — but `props.theme` access in custom styles will not work.

### Usage

Wrap your app in `NotificationsProvider` and include the `Notifications` component anywhere inside it.

```jsx
import Notifications, { NotificationsProvider } from 'react-bugle'

const App = () => (
  <NotificationsProvider>
    <Notifications />
    {/* rest of your app */}
  </NotificationsProvider>
)
```

### Props

| name   | type   | description              |
| ------ | ------ | ------------------------ |
| styles | object | (optional) custom styles |
| icons  | object | (optional) custom icons  |

### Pushing a notification from a React component

```javascript
import { useNotifications } from 'react-bugle'

const MyComponent = () => {
  const { push } = useNotifications()

  return (
    <button onClick={() => push({
      id: Date.now(),
      type: 'success',
      label: 'It worked!',
      duration: 10000
    })}>
      Show notification
    </button>
  )
}
```

### Pushing a notification from outside React

```javascript
import { notificationBridge } from 'react-bugle'

notificationBridge.push({
  id: Date.now(),
  type: 'error',
  label: 'Something went wrong'
})
```

### Pushing a notification with button controls

```javascript
push({
  id: Date.now(),
  type: 'error',
  label: 'Are you sure?',
  buttons: 'ok' // valid options: 'yesNo' or 'ok'
})
```

### Running a callback when a notification is confirmed

```javascript
push({
  id: Date.now(),
  type: 'info',
  label: 'Delete this item?',
  buttons: 'yesNo',
  payload: () => deleteItem(id) // called when the Yes button is clicked
})
```

### Dismissing a notification manually

```javascript
// from inside React
const { pop } = useNotifications()
pop(notificationId)

// from outside React
notificationBridge.pop(notificationId)
```

### Notification properties

| name     | type     | description                                                                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| id       | any      | Unique notification ID                                                                                                                 |
| type     | string   | Notification type. Choose from 3 built-in types: 'success', 'info', 'error' or create a custom type by declaring it in the styles prop |
| label    | string   | Notification label                                                                                                                     |
| duration | number   | (optional) Display duration in milliseconds, default 5000. Ignored when `buttons` is set                                               |
| buttons  | string   | (optional) Show button controls. Options: 'yesNo', 'ok'. Prevents auto-dismiss                                                         |
| payload  | function | (optional) Callback invoked when the Yes or Ok button is clicked                                                                       |
| blocking | boolean  | (optional) Show a darkened overlay behind the notification                                                                             |

### Complete styling example

```javascript
import Notifications, { createNotificationStyle } from 'react-bugle'

const styles = {
  container: (defaults) => ({
    ...defaults,
    alignItems: 'flex-end'
  }),
  containerInner: (defaults) => ({
    ...defaults,
    bottom: '45px'
  }),
  overlay: (defaults) => ({
    ...defaults,
    background: 'darkgray'
  }),
  // add a custom notification type with createNotificationStyle
  customStyle1: createNotificationStyle('purple', 'fuchsia', true),
  // or set every property manually
  customStyle2: {
    notification: (defaults) => ({
      ...defaults,
      background: 'burlywood'
    }),
    notificationInner: (defaults) => ({
      ...defaults,
      minHeight: '100px'
    }),
    icon: (defaults) => ({
      ...defaults,
      fontSize: '40px',
    }),
    label: (defaults) => ({
      ...defaults,
      color: 'brown'
    }),
    buttonsOuter: (defaults) => ({
      ...defaults,
      background: 'red'
    }),
    button: (defaults) => ({
      ...defaults,
      fontSize: '20px'
    })
  },
  // override the default 'error' type
  error: {
    ...createNotificationStyle(
      'red',  // primary color
      'blue', // secondary color
      true    // set to false to disable the background animation
    ),
    label: (defaults) => ({
      ...defaults,
      color: 'black',
      fontSize: '20px'
    })
  }
}

const icons = {
  customStyle1: <>🐼</>,
  customStyle2: <>🥒</>,
  success: null, // no icon for success
}

const App = () => <Notifications styles={styles} icons={icons} />
```

### License

MIT
