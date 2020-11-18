import css from './style.scss'

class TaskCreator extends HTMLElement {
  constructor(addTaskCallBack) {
    super()
    this.attachShadow({ mode: 'open' })
    this.addTaskCallBack = addTaskCallBack
    this._input = null
    this._btn = null
  }

  connectedCallback() {
    this.render()

    this._input = this.shadowRoot.querySelector('.task-creator__input')
    this._input.addEventListener('keydown', (evt) => {
      if (evt.code === 'Enter') {
        evt.preventDefault()
        this.onInputListener(this._input)
      }
    })

    this._btn = this.shadowRoot.querySelector('.task-creator__btn')
    this._btn.addEventListener('click', () => {
      this.onInputListener(this._input)
    })
  }

  onInputListener(input) {
    if (input.value.trim()) {
      this.addTaskCallBack(input.value.trim())
      input.value = ''
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${css}</style>
    <section class='task-creator'>
      <input type='text' class='task-creator__input' placeholder='Create new task' />
      <button class='task-creator__btn'></button>
    </section>
  `
  }
}

customElements.define('task-creator', TaskCreator)

export default TaskCreator
