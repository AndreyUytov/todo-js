class RedactInput extends HTMLElement {
  constructor(task, cb) {
    super()
    this.task = task
    this._input = null
    this.cb = () => {
      cb({
        id: this.task.id,
        value: this._input.value,
        isDone: this.task.isDone,
      })
      this.remove()
    }
  }

  connectedCallback() {
    this.render()

    this._input = this.querySelector('.redact__input')
    this._input.value = this.task.value
    this._input.focus()
    this._input.addEventListener('blur', this.cb)
  }

  disconnectedCallback() {
    this._input.removeEventListener('blur', this.cb)
  }

  render() {
    this.innerHTML = `
      <input type='text' class='redact__input' />
      <button class='redact__btn snap'>
        <svg class='redact__svg task__redactIcon'>
          <use href='#edit-icon' class='task__redactUse' />
        </svg>
      </button>
    `
  }
}

customElements.define('redact-input', RedactInput)

export default RedactInput
