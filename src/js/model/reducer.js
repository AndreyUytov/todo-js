function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return state++
    default:
      return state
  }
}

function tasks(state = [], action) {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return [
        ...state,
        {
          id: action.id,
          value: action.value,
          isDone: action.isDone,
        },
      ]

    case 'EDIT_TASK':
      return state.reduce((result, elem) => {
        if (elem.id === action.id) {
          elem.isDone = action.isDone
          elem.value = action.value
          result.push(elem)
        } else result.push(elem)
        return result
      }, [])

    case 'DELETE_TASK':
      return state.reduce((result, elem) => {
        if (elem.id !== action.id) {
          result.push(elem)
        }
        return result
      }, [])

    default:
      return state
  }
}

export default function rootReducer(state, action) {
  return {
    counter: counter(state.counter, action),
    tasks: tasks(state.tasks, action),
  }
}
