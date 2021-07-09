export interface Poem {
    id?: string
    poet?: string
    title?: string
    poem?: string
    token?: string
}

export interface User {
    id: string
    username: string
    email: string
    vogon_name?: string
    solana_address?: string
    picture_path?: string
}
