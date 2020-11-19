import css from './style.scss'

class FooterTasks extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
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
