type IRouteCreator = {
  edit(id?: EntityId): string
  create(): string
} & ((params?: EntityId) => string)

export function getRoute() {
  const articles = createRouteCreator('articles')
  const projects = createRouteCreator('projects')
  const users = createRouteCreator('users')

  return {
    articles,
    projects,
    users,
  }
}

function createRouteCreator(path: string) {
  const root: IRouteCreator = (params?: EntityId) => {
    const result = `/${path}/` + (params ? params : '')
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
