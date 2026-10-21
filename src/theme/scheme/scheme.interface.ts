import type {ColorRole} from '../palette'
import type {SCHEME} from './scheme.enum'

export type Scheme = (typeof SCHEME)[keyof typeof SCHEME]
export type ColorScheme = Record<ColorRole, string>
