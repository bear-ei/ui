import type {PLATFORM, SIZE} from './theme.enum'

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM]
export type Size = (typeof SIZE)[keyof typeof SIZE]
