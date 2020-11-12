import TaskLi from './task-elem'
import css from './style.scss'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.tasks = tasks
    this.attachShadow({ mode: 'open' })
    this.scss = document.createElement('style')
    this.scss.append(css)
    this.ul = document.createElement('ul')
    this.ul.append(
      ...this.tasks.map((el) => {
        return new TaskLi(el)
      })
    )
    this.ul.addEventListener('task', (evt) => {
      console.log(evt.detail.id)
    })
    console.log('from constructor')
  }
  connectedCallback() {
    this.shadowRoot.append(this.scss, this.ul)
    console.log('render')
  }

  addTasks(tasks) {
    if (Array.isArray(tasks)) {
      this.tasks = [...this.tasks, ...tasks]
      this.ul.prepend(
        ...tasks.map((el) => {
          return new TaskLi(el)
        })
      )
    } else {
      this.tasks.push(tasks)
      this.ul.prepend(new TaskLi(tasks))
    }

    console.log(this.tasks)
  }
  getTasks() {
    return this.tasks
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
