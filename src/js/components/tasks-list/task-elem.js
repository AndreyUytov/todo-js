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
    this.li = document.createElement('li')
    this.li.textContent = this.elem
    this.li.addEventListener('click', () => {
      this.li.dispatchEvent(this.clickEvent)
    })
    this.label = document.createElement('label')
    this.checkbox = document.createElement('input')
    this.markerCheck = document.createElement('span')
    this.redactBtn = document.createElement('button')
    this.redactBtnIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'use'
    )
    this.svgSprite = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
  }
  connectedCallback() {
    const html = `
      <svg style='display:none;'>
        <symbol id="edit-btn" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M8.0257 3.61491H3.35903C3.00541 3.61491 2.66627 3.75539 2.41622 4.00544C2.16617 4.25549 2.0257 4.59463 2.0257 4.94825V14.2816C2.0257 14.6352 2.16617 14.9743 2.41622 15.2244C2.66627 15.4744 3.00541 15.6149 3.35903 15.6149H12.6924C13.046 15.6149 13.3851 15.4744 13.6352 15.2244C13.8852 14.9743 14.0257 14.6352 14.0257 14.2816V9.61491" stroke="#181818" style="stroke: var(--svg-edit-btn-color, #181818)" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.0257 2.61484C13.2909 2.34962 13.6506 2.20062 14.0257 2.20062C14.4008 2.20062 14.7605 2.34962 15.0257 2.61484C15.2909 2.88005 15.4399 3.23976 15.4399 3.61484C15.4399 3.98991 15.2909 4.34962 15.0257 4.61484L8.69236 10.9482L6.0257 11.6148L6.69236 8.94817L13.0257 2.61484Z" stroke="#181818" style="stroke: var(--svg-edit-btn-color, #181818)" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="16" height="16" fill="white" transform="translate(0.692383 0.948242)"/>
        </clipPath>
        </defs>
      </symbol>
      </svg>
      <li id='task__element'>
        <label id='task__label'>
          <input type='checkbox' id='task__input' />
          ${this.elem}
        </label>
        <button id='task__redactBtn'>
          <svg id='task__redactIcon'>
            <use href='#'
          </svg>
        </button>
      </li>
    `

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(this.li)
  }
}

customElements.define('task-elem', TaskLi)

export default TaskLi
