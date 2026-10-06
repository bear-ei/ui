import type {BORDER_SIZE} from './border.enum'

export type BorderSize = (typeof BORDER_SIZE)[keyof typeof BORDER_SIZE]
export type Border = Record<BorderSize, number>
