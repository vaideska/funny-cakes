import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authZState, authZModal, user } from '../../../types/authZTypes'

const initialState: authZState = {
    status: {
        isLoged: false,
        loading: false,
        error: null
    },
    user: {
        id: null,
        email: null,
        firstName: undefined,
        lastName: null,
        profile_picture: undefined,
    },
    modal: {
        isOpen: false,
        variant: 'login'
    }
}

export const authZSlice = createSlice({
    name: 'AuthZ',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<user>) => {
            state.status.isLoged = true
            state.user = action.payload;
            //TODO: Реализовать закрытие вызовом экшена closeAuthZModal. Через Thunk
            state.modal.isOpen = false
            state.modal.variant = 'login'
        },
        logout: (state, /* action: PayloadAction<boolean> */) => {
            state.status.isLoged = false
        },
        openAuthZModal: (state) => {
            state.modal.isOpen = true
        },
        closeAuthZModal: (state) => {
            state.modal.isOpen = false
            state.modal.variant = 'login'
        },
        setAuthZModalVariant: (state) => {
            state.modal.variant = state.modal.variant === 'login' ? 'register' : 'login'
        },
    },
})

export const { 
    login,
    logout,
    openAuthZModal,
    closeAuthZModal,
    setAuthZModalVariant 
} = authZSlice.actions

export const authZReducer = authZSlice.reducer
