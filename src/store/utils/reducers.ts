export function startLoadingReduser<T extends { loading: boolean }>(state: T) {
  state.loading = true
}

export function endLoadingReduser<T extends { loading: boolean }>(state: T) {
  state.loading = false
}
