/**
 * Get date in SQL date format
 * @example "2023-03-01 00:00:00"
 *
 * @export
 * @param {date} Date
 * @returns {string}
 */
export function dateToSQLFormatString(date: Date): string {
  const starttime = date
  const isotime = new Date(new Date(starttime).toISOString())
  const fixedtime = new Date(isotime.getTime() - starttime.getTimezoneOffset() * 60000)
  const formatedMysqlString = fixedtime.toISOString().slice(0, 10).replace('T', ' ')
  return formatedMysqlString
}
