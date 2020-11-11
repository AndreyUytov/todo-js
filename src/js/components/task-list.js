import TaskLi from './task-elem'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.attachShadow({ mode: 'open' })
    this.elements = tasks.map((el) => {
      return new TaskLi(el)
    })
    this.ul = document.createElement('ul')
    this.ul.append(...this.elements)
  }
  connectedCallback() {
    this.shadowRoot.append(this.ul)
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
