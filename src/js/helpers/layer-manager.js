class LayerManager {
  constructor() {
    this._layers = []
    this._events = {}
    this._handleEvent = this._handleEvent.bind(this)
  }

  // public

  add(layer = {}) {
    if (!this._isValidLayer(layer)) return
    this.this._eventsReducer("add", layer.events)
    this.layers.push(layer)
  }

  remove(targetId) {
    if (!this.layers.length) return
    if (typeof targetId !== "string") return

    const topLayer = this.layers[this.layers.length - 1]

    if (topLayer.id === targetId) {
      const layer = this.layers.pop()
      this._eventsReducer("remove", layer.events)
    } else {
      this._forEachReverse(this.layers, (layer, index) => {
        if (layer.id !== targetId) return
        this.layers.splice(index, 1)
        this._eventsReducer("remove", layer.events)
        return false
      })
    }
  }

  get layers() {
    return this._layers
  }

  get events() {
    return this._events
  }

  // private

  _forEachReverse(array, callback) {
    if (!Array.isArray(array) || !array.length) return
    for (let index = array.length - 1; index >= 0; index--) {
      const result = callback(array[index], index)
      if (typeof result === "boolean" && !result) break
    }
  }

  _layerExists(id) {
    let exists = false

    this._forEachReverse(this.layers, layer => {
      if (layer.id === id) {
        exists = true
        return false
      }
    })

    return exists
  }

  _eventsReducer(type, events) {
    switch (type) {
      case "add": {
        events.forEach(eventType => {
          const eventCount = this.events[eventType]
          if (!eventCount) {
            window.addEventListener(eventType, this._handleEvent, true)
            this.events[eventType] = 1
          } else {
            this.events[eventType] = eventCount + 1
          }
        })
        break
      }
      case "remove": {
        events.forEach(eventType => {
          const eventCount = this.events[eventType]
          if (eventCount === 1) {
            delete this.events[eventType]
            window.removeEventListener(eventType, this._handleEvent, true)
          } else {
            this.events[eventType] = eventCount - 1
          }
        })
        break
      }
      default: {
        break
      }
    }
  }

  _isValidLayer(layer) {
    return (
      Object.keys(layer).length &&
      Array.isArray(layer.events) &&
      layer.events.length &&
      typeof layer.callback === "function" &&
      typeof layer.id === "string" &&
      !this._layerExists(layer.id)
    )
  }

  _handleEvent(event) {
    const topLayer = this.layers[this.layers.length - 1]

    if (topLayer.events.includes(event.type)) {
      topLayer.callback(event)
    }
  }
}

export default new LayerManager()
