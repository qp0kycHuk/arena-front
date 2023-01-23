const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@assets': resolvePath('./src/assets'),
            '@components': resolvePath('./src/components'),
            '@hooks': resolvePath('./src/hooks'),
            '@features': resolvePath('./src/features'),
            '@services': resolvePath('./src/services'),
            '@layouts': resolvePath('./src/layouts'),
            '@lib': resolvePath('./src/lib'),
            '@pages': resolvePath('./src/pages'),
            '@utils': resolvePath('./src/utils'),
            '@const': resolvePath('./src/const'),
            '@store': resolvePath('./src/store'),
        }
    },
}