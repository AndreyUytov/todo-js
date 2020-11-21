class TaskLi extends HTMLElement {
  constructor({ id, value, isDone = false }) {
    super()
    this.value = value
    this.isDone = isDone

    this._id = id
    this._checkbox = null
    this._labelText = null
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
    this._checkbox = this.querySelector('.task__input')
    this._labelText = this.querySelector('.task__text')
  }

  get id() {
    return this._id
  }

  set isDone(bool) {
    this._isDone = bool
  }

  get isDone() {
    if (!this._checkbox) {
      return this._isDone
    } else return this._checkbox.checked
  }

  set value(value) {
    if (!this._labelText) {
      this._text = value
    } else {
      this._labelText.textContent = this._text = value
    }
  }

  get value() {
    return this._text
  }

  update(task) {
    if (!task) {
      this.remove()
      return
    } else if (task.value !== this.value) {
      this.value = task.value
    } else if (task.isDone !== this.isDone) {
      this.isDone = task.isDone
    }
  }

  render() {
    console.log('RENDER TASK!')
    this.innerHTML = `
    <li class='task'>
      <label class='task__label'>
        <input type='checkbox' data-action='check'
         class='task__input visually-hidden'
        ${this.isDone ? 'checked' : ''} />
        <svg class='task__checkbox-marker'>
          <use href='#checkbox-icon' />
        </svg>
        <span class='task__text'>${this.value}</span>
      </label>
      <button data-action='redact' class='task__redactBtn snap'>
        <svg class='task__redactIcon'>
          <use href='#edit-icon' class='task__redactUse' />
        </svg>
      </button>
      <button data-action='delete' class='task__deleteBtn snap'>
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
