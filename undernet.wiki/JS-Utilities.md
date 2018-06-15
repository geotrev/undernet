Using Undernet's JavaScript components is very straightforward. There are two options: import the library into a javascript file, or link it just before the end of your `<body>` tag. Either way, `Undernet` will be attached to the `window` object for you to access.

### Start all components

Turn on event listeners on components manually. `start()` is a method on the `Undernet` object.

```js
// vanilla JS
var startMonolith = Undernet.start()
document.addEventListener("DOMContentLoaded", startMonolith)
```

```js
// React
import React from 'react'
import Undernet from 'undernet'
export default someComponent extends React.Component {
  componentDidMount() {
    Undernet.start()
  }
}
```

### Stop all components

Turn off event listeners on components manually. `stop()` is a method on the `Undernet` object.

```js
// vanilla JS
Undernet.stop()
```

```js
// React
import Undernet from 'undernet'
export default someComponent extends React.Component {
  componentWillUnmount() {
    Undernet.stop()
  }
}
```

### Start or stop a single component

If you prefer not to use all of Undernet's components at once like above, you can instead access similarly named methods on a specific component.

```js
// vanilla JS
var startAccordions = Undernet.Accordions.start()
document.addEventListener("DOMContentLoaded", startAccordions)
```

```js
// React
import React from 'react'
import Undernet from 'undernet'
export default someComponent extends React.Component {
  componentDidMount() {
    Undernet.Accordions.start()
  }
}
```
