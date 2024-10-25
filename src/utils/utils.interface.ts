export type NamePath<T = Record<string, unknown>> = keyof T | (keyof T)[]
export interface AdaptWindowOptions {
        screenHeight?: number
        screenWidth?: number
}

export interface AdaptDesignOptions {
        designDensity?: number
        designHeight?: number
        designWidth?: number
}
