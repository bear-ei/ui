import type {SIZE} from './common.enum'

export type Size = (typeof SIZE)[keyof typeof SIZE]
