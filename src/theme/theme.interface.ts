import type {PLATFORM} from './theme.enum'

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM]
