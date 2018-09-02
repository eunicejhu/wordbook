import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


export default function configureStore() {
  // return createStore(
  //   rootReducer,
  //   compose(applyMiddleware(thunk),
  //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //   )
  // );
  // Only chrome can handle the redux dev tool
  // redux compose cannot handle a null or undefined middleware
  if (window.navigator.userAgent.includes('Chrome')) {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
  } else {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk)
      )
    );
  }
}