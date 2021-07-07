export interface Poem {
    id?: string
    poet?: string
    title?: string
    poem?: string
    token?: string
}

export interface Poems {
    poems: Poem[]
}
