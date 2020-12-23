import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

const store = configureStore({
    reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && (module as unknown as any).hot) {
    (module as unknown as any).hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch

export default store
