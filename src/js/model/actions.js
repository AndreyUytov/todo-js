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

export function deleteCompleteTasks() {
  return {
    type: 'DELETE_COMPLETE_TASKS',
  }
}

export function doAllTasksComplete() {
  return {
    type: 'DO_ALL_TASKS_COMPLETE',
  }
}
