export interface authZState {
    status: authZStatus,
    user: user,
    modal: authZModal
}

export interface authZModal {
    isOpen: boolean,
    variant: 'login' | 'register'
}

export interface authZStatus {
    isLoged: boolean,
    loading: boolean,
    error: string | null,
}

export interface user {
    id: string | null,
    email: string | null,
    name?: string | null,
    avatar?: string | null,
}
