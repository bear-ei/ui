import type {createAnimatedConfig} from '../animated'
import type {Contrast} from '../color'
import type {Density, UIDensity} from '../density'
import type {Elevation} from '../elevation'
import type {Font} from '../font'
import type {Opacity} from '../opacity'
import type {Palette} from '../palette'
import type {ColorScheme, Scheme} from '../scheme'
import type {Shape} from '../shape'
import type {Typography} from '../typography'
import type {PLATFORM} from './core.enum'

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM]
export interface TokenOptions {
	codeFontFamily?: string
	density?: UIDensity
	fontFamily?: string
	platform?: Platform
}

export interface Theme {
	animated: ReturnType<typeof createAnimatedConfig>
	elevation: Elevation
	font: Font
	opacity: Opacity
	palette: Palette
	scheme: ColorScheme
	shape: Shape
	density: Density
	typography: Typography
}

export interface PaletteOptions {
	contrast?: Contrast
	scheme?: Scheme
}
