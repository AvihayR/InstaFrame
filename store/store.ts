import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { systemReducer } from './reducers/system.reducer'
import { postReducer } from './reducers/posts.reducer'
// import { userReducer } from './user.reducer.js'
// import { reviewReducer } from './review.reducer'
// import { systemReducer } from './system.reducer'
// import { orderReducer } from './reducers/order.reducer.js'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const rootReducer = combineReducers({
    systemModule: systemReducer,
    postModule: postReducer,
    // userModule: userReducer,
})

let middleware = applyMiddleware(/* Add your middleware here if needed */)

// Check if running on the client side
if (typeof window !== 'undefined') {
    // Apply Redux DevTools extension if available
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    middleware = composeEnhancers(middleware)
}

export const store = createStore(rootReducer, middleware)

export type RootStoreState = ReturnType<typeof rootReducer>

store.subscribe(() => {
    // console.log('storeState:\n', store.getState())
    // console.log('**** Store state changed: ****')
    // console.log('*******************************')
})
