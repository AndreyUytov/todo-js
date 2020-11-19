class RedactInput extends HTMLElement {
  constructor(task, cb) {
    super()
    this.task = task
    this._input = null
    this._btn = null
    this.flag = false
    this.cb = () => {
      this.task.value = this._input.value
      cb(task)
      this.remove()
    }
  }

  connectedCallback() {
    this.render()

    this._input = this.querySelector('.redact__input')
    this._input.value = this.task.value
    this._input.focus()
    this._input.addEventListener('blur', this.cb)

    this._btn = this.querySelector('.redact__btn')
    this._btn.addEventListener('click', this.cb)
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this.cb)
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
