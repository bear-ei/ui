export const generateRandomNumberString = (length: number) =>
        Array.from({length}, () => Math.floor(Math.random() * 10)).join('')
