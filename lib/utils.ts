import { format } from 'date-fns'

const formatDateShort = (date: string) => format(new Date(date), 'MMMM do')

const removeExtension = (path: string, extention: string) => path.replace(`.${extention}`, '')

const groupBy = <T extends { [key: string]: any }>(array: T[], propName: keyof T) => {
    return array.reduce((acc, current) => {
        if (!current[propName]) return acc
        return {
            ...acc,
            [current[propName]]: [...acc[current[propName]] ?? [], current]
        }
    }, {} as { [key: string]: T[] })
}



export { removeExtension as removeExtenstion, groupBy, formatDateShort }