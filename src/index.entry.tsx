import React from 'react'
import ReactDOM from 'react-dom'
import App from '@same/components/App'
import { createStore } from 'redux'
import rootReducer from '@same/reducers'
import { Provider } from 'react-redux'

export const store = createStore(rootReducer)
const rootNode = document.createElement('root')
document.body.append(rootNode)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , rootNode)
