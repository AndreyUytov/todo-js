import './styles/index.scss'

import Controller from './js/controller'
import createStore from './js/model/create-store'
import rootReducer from './js/model/reducer'

let ExampleState = {
  counter: 0,
  tasks: [
    { id: 0, value: 'Для перетаскивания зажмите левую клавишу мыши на задаче', isDone: false },
    { id: 1, value: 'Сделать свой drag-n-drop', isDone: false },
    { id: 2, value: 'Сделать todo с веб-компонентами в стиле MVC', isDone: false },
    { id: 3, value: 'Сделать свой createStore как в redux', isDone: false },
  ],
}

let preloadedState = JSON.parse(localStorage.getItem('todoState')) || ExampleState

const store = createStore(rootReducer, preloadedState)
store.subscribe(() => {
  console.log(store.getState().tasks)
  localStorage.setItem('todoState', JSON.stringify(store.getState()))
})

const cntr = new Controller(store)

cntr.renderApp()
