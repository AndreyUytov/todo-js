import './styles/index.scss'

import TaskUl from './js/components/tasks-list'

const taskList = new TaskUl(['разработать интерфейс программы', 'two'])

document.body.append(taskList)

setTimeout(() => {
  taskList.addTasks(['1', '2'])
}, 3000)
