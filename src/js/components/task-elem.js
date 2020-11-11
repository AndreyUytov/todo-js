class TaskLi extends HTMLElement {
  constructor(elem) {
    super()
    this.elem = elem
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    const li = document.createElement('li')
    li.textContent = this.elem
    this.shadowRoot.append(li)
  }
}

customElements.define('task-elem', TaskLi)

export default TaskLi
