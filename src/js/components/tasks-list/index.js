import TaskLi from './task-elem'
import RedactInput from './redact-input'
import css from './style.scss'
import svgSprite from './svg-sprite'

class TaskUl extends HTMLElement {
  constructor({ tasks, deleteTask, editTask }) {
    super()
    this.tasks = tasks.map((el) => {
      return new TaskLi(el)
    })
    this.dragNdropFlag = false
    this.deleteCallBack = deleteTask
    this.editCallBack = editTask
    this.attachShadow({ mode: 'open' })
    this.ul = document.createElement('ul')
    this.ul.className = 'tasks-list'
    this.ul.append(...this.tasks)

    this.ul.addEventListener('click', (evt) => {
      let actionElem = evt.target.closest('[data-action]')
      if (!actionElem) return

      let action = actionElem.dataset.action
      if (action) {
        let task = evt.target.closest('task-elem')
        this[action](task)
      }
    })

    this.ul.addEventListener('pointerdown', (evt) => {
      let target = evt.target.closest('task-elem')
      let shiftY = evt.clientY - target.getBoundingClientRect().top
      target.style.position = 'absolute'

      function moveAt(evt) {
        target.style.position = 'absolute'
      }

      target.addEventListener('pointermove', moveAt)

      document.addEventListener('pointerup', (evt) => {
        target.style.position = 'static'
        target.removeEventListener('pointermove', moveAt)
      })
    })
  }

  connectedCallback() {
    this.render()
    this.shadowRoot.append(this.ul)
  }

  check(task) {
    console.log(task.isDone, task.id)
    this.editCallBack(task)
  }

  redact(task) {
    const redactInput = new RedactInput(task, this.editCallBack)
    task.append(redactInput)
    console.log(task.value)
  }

  delete(task) {
    console.log(task)
    this.deleteCallBack(task)
  }

  addTask(task) {
    const taskForAdd = new TaskLi(task)
    this.tasks = [taskForAdd, ...this.tasks]
    this.ul.prepend(taskForAdd)

    console.log(this.tasks)
  }

  update(tasks) {
    if (tasks.length > this.tasks.length) {
      console.log(this.tasks.length, 'from 1st')
      this.addTask(tasks[0])
      return
    }

    if (tasks.length <= this.tasks.length) {
      console.log(this.tasks.length, 'from 2st')
      let tasksElements = []
      this.tasks.forEach((el) => {
        let taskFromState = tasks.find((obj) => el.id === obj.id)
        el.update(taskFromState)
        if (taskFromState) {
          tasksElements.push(el)
        }
      })
      this.tasks = tasksElements
      console.log(this.tasks.length, 'from 2st')
      return
    }
  }

  render() {
    console.log('RENDER TASK-LIST')
    this.shadowRoot.innerHTML = `
    <style>${css}</style>
    ${svgSprite}`
  }
}

customElements.define('task-list', TaskUl)

export default TaskUl
