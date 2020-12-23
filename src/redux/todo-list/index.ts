import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../rootReducer';


export type TodoListItemType = {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
}

interface SetTodoListItems {
    items: Array<TodoListItemType>;
}


export const fetchTodoListItems = createAsyncThunk(
    'todoList/fetchTodoListItems',
    async ( a, thunkAPI) => {
        const state = thunkAPI.getState() as unknown as RootState;
        const token = state.user.token as string;
        console.log(state);
        const response = await fetch('https://academeez-login-ex.herokuapp.com/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
);

const todoListItemsAdapter = createEntityAdapter<TodoListItemType>({
    selectId: (item) => item.id,
    // Keep the "all IDs" array sorted based on item titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

let initialState = todoListItemsAdapter.getInitialState();

const todoListStateSlice = createSlice({
    name: 'todoListState',
    initialState,
    reducers: {
        setTodoListItems(state, action: PayloadAction<SetTodoListItems>) {
            todoListItemsAdapter.setAll(state, action.payload.items)
        },
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        // @ts-ignore
        [fetchTodoListItems.fulfilled]: (state, action) => {
            // Add user to the state array
            todoListItemsAdapter.setAll(state, action.payload)
        }
    }
});

export const {
    setTodoListItems,
} = todoListStateSlice.actions;

export default todoListStateSlice.reducer
