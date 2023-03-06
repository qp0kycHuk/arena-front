
/**
 * Get date in SQL date format
 * @example "2023-03-01 00:00:00"
 *
 * @export
 * @param {date} Date
 * @returns {string}
 */
export function dateToSQLFormatString(date: Date) :string {
    var starttime = date;
    var isotime = new Date((new Date(starttime)).toISOString());
    var fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000));
    var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');
    return formatedMysqlString
}