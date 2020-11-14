class TaskLi extends HTMLElement {
  constructor({ id, text }) {
    super()
    this.text = text
    this._id = id
    this._checkbox = null
    this.addEventListener('click', () => {
      console.log(this.isDone)
    })
  }

  static get observedAttributes() {
    return ['text']
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
    this._checkbox = this.querySelector('.task__input')
    console.log(
      'render run',
      this.getAttribute('text'),
      this.isDone,
      this.querySelector('.task__input')
    )
  }

  get isDone() {
    return this._checkbox.checked
  }

  set text(text) {
    this.setAttribute('text', text)
  }

  get text() {
    return this.getAttribute('text')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render()
  }

  render() {
    this.innerHTML = `
    <li class='task'>
      <label class='task__label'>
        <input type='checkbox' class='task__input visually-hidden' />
        <svg class='task__checkbox-marker'>
          <use href='#checkbox-icon' />
        </svg>
        ${this.text}
      </label>
      <button class='task__redactBtn snap'>
        <svg class='task__redactIcon'>
          <use href='#edit-icon' class='task__redactUse' />
        </svg>
      </button>
      <button class='task__deleteBtn snap'>
        <svg class='task__deleteIcon'>
          <use href='#close-icon' class='task__deleteUse' />
        </svg>
      </button>
    </li>
  `
  }
}

customElements.define('task-elem', TaskLi)

export default TaskLi
