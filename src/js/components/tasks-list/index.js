import TaskLi from './task-elem'
import css from './style.scss'
import svgSprite from './svg-sprite'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.tasks = tasks
    this.attachShadow({ mode: 'open' })
    this.ul = document.createElement('ul')
    this.ul.className = 'tasks-list'
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
    this.shadowRoot.innerHTML = this.render()
    this.shadowRoot.append(this.ul)
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

  render() {
    return `
    <style>${css}</style>
    ${svgSprite}`
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
