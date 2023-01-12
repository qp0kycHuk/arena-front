export function filterFiles(data: File[], fileMatchRegex?: RegExp): File[] {
    const arr: File[] = [];

    Array.from(data)
        .map(item => {
            if (fileMatchRegex) {
                return item.type.match(fileMatchRegex) ? item : null
            } else {
                return item
            }
        })
        .forEach((item) => {
            if (item !== null) {
                arr.push(item)
            }
        })

    return arr
};