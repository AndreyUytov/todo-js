import TaskLi from './task-elem'
import css from './style.scss'
import svgSprite from './svg-sprite'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.tasks = tasks.map((el) => {
      return new TaskLi(el)
    })
    this.attachShadow({ mode: 'open' })
    this.ul = document.createElement('ul')
    this.ul.className = 'tasks-list'
    this.ul.append(...this.tasks)

    this.ul.addEventListener('click', (evt) => {
      let actionElem = evt.target.closest('[data-action]')
      if (!actionElem) return

      let action = actionElem.dataset.action
      if (action) {
        let task = evt.target.closest('task-elem')
        this[action](task)
      }
    })
  }

  connectedCallback() {
    this.render()
    this.shadowRoot.append(this.ul)
  }

  check(task) {
    console.log(task.isDone, task.id)
  }

  redact(task) {
    task.text = 'Changed'
    console.log(task.text)
  }

  delete(task) {
    console.log(task)
  }

  addTasks(tasks) {
    if (Array.isArray(tasks)) {
      const tasksForAdd = tasks.map((el) => new TaskLi(el))
      this.tasks = [...tasksForAdd, ...this.tasks]
      this.ul.prepend(...tasksForAdd)
    } else {
      const taskForAdd = new TaskLi(tasks)
      this.tasks = [taskForAdd, ...this.tasks]
      this.ul.prepend(taskForAdd)
    }

    console.log(this.tasks)
  }

  deleteTask(tasksId) {
    this.tasks = this.tasks.filter((el) => {
      if (el.id == tasksId) {
        el.remove()
        return false
      } else {
        return true
      }
    })
  }

  getTasks() {
    return this.tasks
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${css}</style>
    ${svgSprite}`
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
