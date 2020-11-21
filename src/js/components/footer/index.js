import css from './style.scss'

class FooterTasks extends HTMLElement {
  constructor(tasks, deleteCb, doAllTaskCompleteCb) {
    super()
    this.attachShadow({ mode: 'open' })
    this.tasks = tasks
    this._comleteTasks = null
    this._allTasks = null
    this._allCheckBtn = null
    this._removeCheckedBtn = null
    this.deleteCb = deleteCb
    this.doAllTaskCompleteCb = doAllTaskCompleteCb
  }

  connectedCallback() {
    this.update(this.tasks)
  }

  disconnectedCallback() {
    this._allCheckBtn.removeEventListener('click', this.doAllTaskCompleteCb)
    this._comleteTasks.removeEventListener('click', this.deleteCb)
  }

  update(tasks) {
    this.tasks = tasks
    if (this.tasks.length && !this.rendered) {
      this.rendered = true
      this.render()
      this._comleteTasks = this.shadowRoot.querySelector('.checked-tasks')
      this._allTasks = this.shadowRoot.querySelector('.all-tasks')
      this._allCheckBtn = this.shadowRoot.querySelector(
        '.footer__check-all-btn'
      )
      this._removeCheckedBtn = this.shadowRoot.querySelector(
        '.footer__remove-checked-btn'
      )
      this._allCheckBtn.addEventListener('click', this.doAllTaskCompleteCb)
      this._removeCheckedBtn.addEventListener('click', this.deleteCb)
      this._comleteTasks.textContent = this.tasks.filter(
        (el) => el.isDone === true
      ).length
      this._allTasks.textContent = this.tasks.length
      return
    }
    if (this.tasks.length && this.rendered) {
      this._comleteTasks.textContent = this.tasks.filter(
        (el) => el.isDone === true
      ).length
      this._allTasks.textContent = this.tasks.length
      return
    }

    if (!this.tasks.length) {
      this.rendered = false
      this.shadowRoot.innerHTML = ``
    }
  }

  render() {
    console.log('RENDER FOOTER!')
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
