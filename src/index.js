import './styles/index.scss'

import TaskUl from './js/components/tasks-list'

const taskList = new TaskUl([
  { id: 1, value: 'разработать интерфейс программы' },
  { id: 2, value: 'two' },
  { id: 3, value: 'tree', isDone: true },
])

document.body.append(taskList)

setTimeout(() => {
  console.log(taskList.getTasks())
  taskList.getTasks().forEach((element) => {
    element.isDone ? taskList.deleteTask(element.id) : ''
  })
  taskList.addTasks({ id: 5, value: 'ghbdtn' })
  console.log(taskList.getTasks())
}, 2000)
