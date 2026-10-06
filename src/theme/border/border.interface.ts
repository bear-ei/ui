import type {BORDER} from './border.enum'

export type BorderLevel = (typeof BORDER)[keyof typeof BORDER]
export type Border = Record<BorderLevel, number>
