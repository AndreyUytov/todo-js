import './styles/index.scss'

import TaskUl from './js/components/tasks-list'

const taskList = new TaskUl([
  { id: 1, value: 'разработать интерфейс программы' },
  { id: 2, value: 'two' },
  { id: 3, value: 'tree', isDone: true },
])

document.body.append(taskList)

// setTimeout(() => {
//   taskList.addTasks(['1', '2'])
// }, 3000)
