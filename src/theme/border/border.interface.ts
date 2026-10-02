import type {Size} from '../theme.interface'

export type Border = Record<Extract<Size, 'MEDIUM' | 'NONE' | 'SMALL'>, number>
