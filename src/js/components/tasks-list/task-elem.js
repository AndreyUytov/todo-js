class TaskLi extends HTMLElement {
  constructor(elem) {
    super()
    this.elem = elem
    this.clickEvent = new CustomEvent('task', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { id: '1' },
    })
    this.checked = true
    this.li = document.createElement('li')
    this.li.textContent = this.elem
    this.li.addEventListener('click', () => {
      console.log(this.checked)
      this.li.dispatchEvent(this.clickEvent)
    })
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(this.li)
  }
}

customElements.define('task-elem', TaskLi)

export default TaskLi
