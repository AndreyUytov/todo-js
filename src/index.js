import './styles/index.scss'

import TaskUl from './js/components/tasks-list/task-list'

const taskList = new TaskUl(['one', 'two'])

document.body.append(taskList)

setTimeout(() => {
  taskList.addTasks(['1', '2'])
}, 3000)
