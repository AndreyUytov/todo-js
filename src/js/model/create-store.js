export default function createStore(reducer, preloadedState) {
  let currentState = preloadedState || {}
  let currentReducer = reducer
  let listeners = new Set()

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action)

    for (let listener of listeners.values()) {
      listener()
    }
    return action
  }

  dispatch({ type: 'INIT' })

  return {
    getState,
    subscribe,
    dispatch,
  }
}
