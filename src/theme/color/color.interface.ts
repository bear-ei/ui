import type {CONTRAST} from './color.enum'

export type Contrast = (typeof CONTRAST)[keyof typeof CONTRAST]
