import { createStore, combineReducers, applyMiddleware, compose, Reducer, Action } from 'redux'
import { systemReducer } from './reducers/system.reducer'
import { postReducer } from './reducers/posts.reducer'
import { PostState, RootState, SystemState } from '../typings'
// import { userReducer } from './user.reducer.js'
// import { reviewReducer } from './review.reducer'
// import { systemReducer } from './system.reducer'
// import { orderReducer } from './reducers/order.reducer.js'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const rootReducer: Reducer<RootState, Action<string>> = combineReducers({
    systemModule: systemReducer as Reducer<SystemState, Action<string>>,
    postModule: postReducer as Reducer<PostState, Action<string>>,
    // userModule: userReducer,
})

let middleware = applyMiddleware(/* Add your middleware here if needed */)

if (typeof window !== 'undefined') {
    // Apply Redux DevTools extension if available
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    middleware = composeEnhancers(middleware)
}

export const store = createStore(rootReducer, middleware)

export type RootStoreState = ReturnType<typeof rootReducer>

store.subscribe(() => {
    // console.log('storeState:\n', store.getState())
})
