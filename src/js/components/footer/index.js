import css from './style.scss'

class FooterTasks extends HTMLElement {
  constructor(tasks) {
    super()
    this.attachShadow({ mode: 'open' })
    this.tasks = tasks
    this._comleteTasks = null
    this._allTasks = null
    this._allCheckBtn = null
    this._removeCheckedBtn = null
  }

  connectedCallback() {
    if (this.tasks.length) {
      this.render()
      this._comleteTasks = this.shadowRoot.querySelector('.checked-tasks')
      this._allTasks = this.shadowRoot.querySelector('.call-tasks')
      this._allCheckBtn = this.shadowRoot.querySelector(
        '.footer__check-all-btn'
      )
      this._removeCheckedBtn = this.shadowRoot.querySelector(
        'footer__remove-checked-btn'
      )
    } else {
      this.shadowRoot.innerHTML = ``
    }
  }

  update() {
    if (this.tasks.length) {
      this.render()
    } else {
      this.shadowRoot.innerHTML = ``
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <footer class='footer'>
        <div class='footer__section'>
          <button class='footer__check-all-btn btn'>Check all</button>
          <button class='footer__remove-checked-btn btn'>Remove checked</button>
        </div>
        <div class='footer__section'>
          <p class='footer__description'>
            Completed tasks:
            <span class='checked-tasks'>1</span>
          </p>
          <p class='footer__description'>
            All tasks:
            <span class='all-tasks'>3</span>
          </p>
        </div>
      </footer>
    `
  }
}

customElements.define('task-footer', FooterTasks)

export default FooterTasks
