export function markFromQuery(text: string, query?: string) {
  if (!query) return text

  const re = new RegExp(query, 'gi')
  return text.replace(re, (str) => '<b>' + str + '</b>')
}
