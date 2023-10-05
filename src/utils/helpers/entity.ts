export function getIds<T extends { id?: EntityId; ID?: EntityId }>(items: T[]) {
  return items.map((item) => (item.id || item.ID) as EntityId)
}

export function getEntities<T extends { id?: EntityId; ID?: EntityId }>(items: T[]) {
  return items.reduce((res, item) => {
    res[(item.id || item.ID) as EntityId] = item

    return res
  }, {} as Record<EntityId, T>)
}
