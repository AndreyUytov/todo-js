import './styles/index.scss'

import TaskUl from './js/components/tasks-list'

const taskList = new TaskUl([
  { id: 1, text: 'разработать интерфейс программы' },
  { id: 1, text: 'two' },
  { id: 1, text: 'tree' },
])

document.body.append(taskList)

// setTimeout(() => {
//   taskList.addTasks(['1', '2'])
// }, 3000)
