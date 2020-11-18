export function addNewTask({ id, value }) {
  return {
    type: 'ADD_NEW_TASK',
    value,
    id,
    isDone: false,
  }
}

export function deleteTask({ id }) {
  return {
    type: 'DELETE_TASK',
    id,
  }
}

export function editTask({ id, value, isDone }) {
  return {
    type: 'EDIT_TASK',
    id,
    value,
    isDone,
  }
}
