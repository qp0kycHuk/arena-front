import { EntityId } from "@reduxjs/toolkit"


interface IRouteCreator extends Function {
    edit(id?: EntityId): string
    create(): string
}

export function getRoute() {
    const articles = createRouteCreator('articles')
    const folders = createRouteCreator('folders')
    const users = createRouteCreator('users')

    return {
        articles,
        folders,
        users
    }
}

function createRouteCreator(path: string) {
    const root: IRouteCreator = (id?: EntityId) => {
        const result = `/${path}/` + (id ? id : '')
        return result
    }

    root.create = () => root() + 'create'
    root.edit = (id) => {
        if (!id) {
            return root.create()
        }
        
        return root() + id + '/edit'
    }

    return root
}