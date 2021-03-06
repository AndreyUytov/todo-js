export default (evt, context, cb) => {
  evt.preventDefault()
  let conteinerHeight = context.ul.offsetHeight

  let target = evt.target.closest('task-elem')
  let widthTarget = target.offsetWidth

  context.startY = evt.clientY

  context.dragNdropTimer = setTimeout(() => {
    
    context.ul.style.height = conteinerHeight + 'px'
    let shiftY = evt.clientY - target.getBoundingClientRect().top
    target.style.width = widthTarget + 'px'
    target.style.touchAction = 'pan-x'
    target.style.position = 'absolute'
    target.style.zIndex = 1000
    context.shadowRoot.append(target)
    

    moveAt(evt.pageY)

    function moveAt(pageY) {
      target.style.top = pageY - shiftY + 'px'
    }

    let currentClosestTask = null
    let currentPositionForAdd = null

    const onPointerMove = (evt) => {
      evt.preventDefault()
      moveAt(evt.pageY)

      target.hidden = true
      let elemUnderPointer = context.shadowRoot.elementFromPoint(
        evt.clientX,
        evt.clientY
      )
      target.hidden = false

      if (!elemUnderPointer) return

      let closestTask = elemUnderPointer.closest('task-elem')

      if (currentClosestTask == closestTask && currentClosestTask !== null) {
        let taskBottom = currentClosestTask.getBoundingClientRect().bottom
        if (taskBottom - evt.clientY <= 25) {
          currentClosestTask.style.borderTop = ''
          currentClosestTask.style.borderBottom = '1px solid var(--akcentColor)'
          currentPositionForAdd = 'after'
        } else {
          currentClosestTask.style.borderBottom = ''
          currentClosestTask.style.borderTop = '1px solid var(--akcentColor)'
          currentPositionForAdd = 'before'
        }
      }

      if (currentClosestTask != closestTask) {
        if (currentClosestTask) {
          currentClosestTask.style.borderBottom = ''
          currentClosestTask.style.borderTop = ''
        }
        currentClosestTask = closestTask
      }
    }

    const onPointerUp = (evt) => {
      target.style.position = ''
      target.style.top = ''
      target.style.zIndex = ''
      target.style.width = ''
      context.ul.style.height = ''

      if (currentClosestTask) {
        currentClosestTask[currentPositionForAdd](target)
        currentClosestTask.style.borderTop = ''
        currentClosestTask.style.borderBottom = ''
      } else {
        context.ul.append(target)
      }

      const ulElements = context.ul.querySelectorAll('task-elem')
      const idsNewOrder = []
      for (let task of ulElements) {
        idsNewOrder.push(task.id)
      }
      cb(idsNewOrder)

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)

    document.addEventListener('pointerup', onPointerUp)
  }, 400)
}
