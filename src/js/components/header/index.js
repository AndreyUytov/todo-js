import css from './style.scss'

export default class Header extends HTMLElement {
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
      <header class='header'>
        <h1 class='title'>ToDo on JS whit web-components</h1>
      </header>
    `
  }
}

customElements.define('task-header', Header)
