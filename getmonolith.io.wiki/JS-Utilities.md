Using Monolith's JavaScript components is very straightforward. There are two options: import the library into a javascript file, or link it just before the end of your `<body>` tag. Either way, `Monolith` will be attached to the `window` object for you to access.

### Start all components

Turn on event listeners on components manually. `start()` is a method on the `Monolith` object.

```js
// vanilla JS
var startMonolith = Monolith.start()
document.addEventListener("DOMContentLoaded", startMonolith)
```

```js
// React
import React from 'react'
import Monolith from 'monolith-suite'
export default someComponent extends React.Component {
  componentDidMount() {
    Monolith.start()
  }
}
```

### Stop all components

Turn off event listeners on components manually. `stop()` is a method on the `Monolith` object.

```js
// vanilla JS
Monolith.stop()
```

```js
// React
import Monolith from 'monolith-suite'
export default someComponent extends React.Component {
  componentWillUnmount() {
    Monolith.stop()
  }
}
```

### Start or stop a single component

If you prefer not to use all of Monolith's components at once like above, you can instead access similarly named methods on a specific component.

```js
// vanilla JS
var startAccordions = Monolith.accordions().start()
document.addEventListener("DOMContentLoaded", startAccordions)
```

```js
// React
import React from 'react'
import Monolith from 'monolith-suite'
export default someComponent extends React.Component {
  componentDidMount() {
    Monolith.accordions().start()
  }
}
```
