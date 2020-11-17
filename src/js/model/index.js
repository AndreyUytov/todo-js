function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return state++
    default:
      return state
  }
}

export default function rootReducer(state, action) {
  return {
    counter: counter(state.counter, action),
  }
}
