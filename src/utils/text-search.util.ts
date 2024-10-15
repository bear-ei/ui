const filterText =
    <T>(keys: (keyof T)[]) =>
    (item: T) =>
    (matchText: string) =>
        keys.some(key => item[key]?.toString().toLowerCase()?.includes(matchText))

export const textSearch =
    <T>(data: T[]) =>
    (keys: (keyof T)[]) =>
    (searchText: string): T[] => {
        const matchText = searchText.toLowerCase()

        return data.filter(item => filterText(keys)(item)(matchText))
    }
