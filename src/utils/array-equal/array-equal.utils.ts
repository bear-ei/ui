export const arrayEqual = (preArray?: string[]) => (nextArray?: string[]) =>
    preArray?.length === nextArray?.length && preArray?.every((key, index) => key === nextArray?.[index])
