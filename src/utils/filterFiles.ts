export function filterFiles(data: File[], fileMatchRegex?: RegExp[]): File[] {
    const arr: File[] = [];
    console.log(data, fileMatchRegex);

    data.map(item => {
        if (fileMatchRegex && fileMatchRegex.length > 0) {
            for (let i = 0; i < fileMatchRegex.length; i++) {
                const regExp = fileMatchRegex[i];

                if (item.type.match(regExp)) {
                    return item
                }
            }

            return null
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