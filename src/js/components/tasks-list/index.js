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
      let widthTarget = target.offsetWidth
      this.dragNdropTimer = setTimeout(() => {
        let shiftY = evt.clientY - target.getBoundingClientRect().top
        target.style.width = widthTarget + 'px'
        target.style.position = 'absolute'
        target.style.zIndex = 1000
        this.shadowRoot.append(target)

        moveAt(evt.pageY)

        function moveAt(pageY) {
          target.style.top = pageY - shiftY + 'px'
        }

        let currentClosestTask = null
        let currentPositionForAdd = null

        const onPointerMove = (evt) => {
          moveAt(evt.pageY)

          target.hidden = true
          let elemUnderPointer = this.shadowRoot.elementFromPoint(
            evt.clientX,
            evt.clientY
          )
          target.hidden = false

          if (!elemUnderPointer) return

          let closestTask = elemUnderPointer.closest('task-elem')

          if (currentClosestTask != closestTask) {
            if (currentClosestTask) {
              currentClosestTask.style.borderBottom = ''
              currentClosestTask.style.borderTop = ''
            }
            currentClosestTask = closestTask
            if (currentClosestTask) {
              let taskBottom = currentClosestTask.getBoundingClientRect().bottom
              if (taskBottom - evt.clientY >= 25) {
                currentClosestTask.style.borderBottom =
                  '1px solid var(--akcentColor)'
                currentPositionForAdd = 'after'
              } else {
                currentClosestTask.style.borderTop =
                  '1px solid var(--akcentColor)'
                currentPositionForAdd = 'before'
              }
            }
          }
        }

        const onPointerUp = (evt) => {
          target.style.position = ''
          target.style.top = ''
          target.style.zIndex = ''
          target.style.width = ''

          currentClosestTask[currentPositionForAdd](target)
          currentClosestTask.style.borderTop = ''
          currentClosestTask.style.borderBottom = ''

          this.shadowRoot.removeEventListener('pointermove', onPointerMove)
          target.removeEventListener('pointerup', onPointerUp)
        }

        this.shadowRoot.addEventListener('pointermove', onPointerMove)

        target.addEventListener('pointerup', onPointerUp)
      }, 1000)
    })

    this.ul.addEventListener('pointerup', (evt) => {
      clearTimeout(this.dragNdropTimer)
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
