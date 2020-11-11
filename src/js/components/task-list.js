import TaskLi from './task-elem'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.tasks = tasks
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    const elements = this.tasks.map((el) => {
      return new TaskLi(el)
    })
    const ul = document.createElement('ul')
    ul.className = 'list'
    ul.append(...elements)
    this.shadowRoot.append(ul)
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
