export interface authZState {
    isLoged: boolean,
    loading: boolean,
    user: user
}

export interface user {
    id: string | null,
    email: string | null,
    name?: string | null,
    avatar?: string | null,
}
