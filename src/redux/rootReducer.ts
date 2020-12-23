import { combineReducers } from '@reduxjs/toolkit'

import userStateReducer from './user/index';
import todoListStateReducer from './todo-list/index';

const rootReducer = combineReducers({
    user: userStateReducer,
    todoList: todoListStateReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
