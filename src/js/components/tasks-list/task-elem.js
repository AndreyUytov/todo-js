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
    this.addEventListener('click', () => {
      this.dispatchEvent(this.clickEvent)
    })
  }
  connectedCallback() {
    this.innerHTML = this.render()
  }

  render() {
    return `
    
    <li class='task'>
      <label class='task__label'>
        <input type='checkbox' class='task__input visually-hidden' />
        <svg class='task__checkbox-marker'>
          <use href='#checkbox-icon' />
        </svg>
        ${this.elem}
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
