import { addNewTask, deleteTask, editTask } from './../model/actions'

import Header from './../components/header'
import TaskUl from './../components/tasks-list'
import TaskCreator from './../components/task-creator'
import Footer from './../components/footer'

export default class Controller {
  constructor(store) {
    this.store = store

    this.deleteTask = this.deleteTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)

    this.header = new Header()
    this.taskCreator = new TaskCreator(this.addNewTask)
    this.taskList = new TaskUl({
      tasks: this.store.getState().tasks,
      deleteTask: this.deleteTask,
      editTask: this.editTask,
    })
    this.unsubscribeTaskList = this.store.subscribe(() =>
      this.taskList.update(this.store.getState().tasks)
    )
    this.footer = new Footer(this.store.getState().tasks)
    this.unsubscribeFooter = this.store.subscribe(() =>
      this.footer.update(this.store.getState().tasks)
    )
  }

  deleteTask(task) {
    this.store.dispatch(deleteTask(task))
  }

  editTask(task) {
    this.store.dispatch(editTask(task))
  }

  addNewTask(value) {
    let id = this.store.getState().counter
    this.store.dispatch(addNewTask({ id, value }))
  }

  renderApp() {
    root.append(this.header, this.taskCreator, this.taskList, this.footer)
  }
}
