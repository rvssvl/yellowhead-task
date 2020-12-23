import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface SetTokenPayload {
    token: string | null;
}

type UserState = {
    token: string | null;
}

let initialState: UserState = {
    token: localStorage.getItem('token'),
}

const userStateSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<SetTokenPayload>) {
            const { token } = action.payload
            state.token = token;
            if (token) {
                localStorage.setItem('token', token);
            }
        },
    }
})

export const {
    setToken,
} = userStateSlice.actions

export default userStateSlice.reducer
