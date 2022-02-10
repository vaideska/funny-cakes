import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authZState, user } from '../../../types/authZTypes'

const initialState: authZState = {
    isLoged: false,
    loading: false,
    user: {
        id: null,
        email: null,
        name: null,
        avatar: null
    }
}

export const authZSlice = createSlice({
    name: 'AuthZ',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<boolean>) => {
            state.isLoged = action.payload
        },
        logout: (state, action: PayloadAction<boolean>) => {
            state.isLoged = action.payload
        },
    },
})

export const { login, logout } = authZSlice.actions

export const authZReducer = authZSlice.reducer
