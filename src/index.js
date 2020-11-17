import './styles/index.scss'

import createStore from './js/model/create-store'
import reducer from './js/model'

import Header from './js/components/header'
import TaskUl from './js/components/tasks-list'

const header = new Header()
const taskList = new TaskUl([
  { id: 1, value: 'разработать интерфейс программы' },
  { id: 2, value: 'two' },
  { id: 3, value: 'tree', isDone: true },
])

root.append(header, taskList)

setTimeout(() => {
  console.log(taskList.getTasks())
  taskList.getTasks().forEach((element) => {
    element.isDone ? taskList.deleteTask(element.id) : ''
  })
  taskList.addTasks({ id: 5, value: 'ghbdtn' })
  console.log(taskList.getTasks())
}, 2000)
