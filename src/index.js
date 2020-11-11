import './styles/index.scss'

import TaskUl from './js/components/task-list'

const taskList = new TaskUl(['one', 'two'])

document.body.append(taskList)
