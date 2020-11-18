import './styles/index.scss'

import Controller from './js/controller'
import createStore from './js/model/create-store'
import rootReducer from './js/model/reducer'

// const preloadedState = JSON.parse(localStorage.getItem('todoState'))
const preloadedState = {
  counter: 0,
  tasks: [
    { id: 1000, value: 'hi', isDone: false },
    { id: 1001, value: 'hello', isDone: true },
    { id: 1002, value: 'you!', isDone: false },
  ],
}
const store = createStore(rootReducer, preloadedState)
store.subscribe(() => {
  console.log(store.getState().tasks)
  localStorage.setItem('todoState', JSON.stringify(store.getState()))
})

const cntr = new Controller(store)

cntr.renderApp()
