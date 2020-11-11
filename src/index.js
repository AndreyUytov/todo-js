import './styles/index.scss'

class TaskUl extends HTMLElement {
  constructor(tasks) {
    super()
    this.tasks = tasks
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    const elements = this.tasks.map((el) => {
      const li = document.createElement('li')
      li.textContent = el
      return li
    })
    const ul = document.createElement('ul')
    ul.className = 'list'
    ul.append(...elements)
    this.shadowRoot.append(ul)
  }
}

customElements.define('task-list', TaskUl)

const taskList = new TaskUl(['one', 'two'])

document.body.append(taskList)
