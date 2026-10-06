import type {createAnimatedConfig} from '../animated'
import type {Border} from '../border'
import type {Classes} from '../classes'
import type {Contrast} from '../color'
import type {Density, UIDensity} from '../density'
import type {Elevation} from '../elevation'
import type {Font} from '../font'
import type {Opacity} from '../opacity'
import type {Palette} from '../palette'
import type {ColorScheme, Scheme} from '../scheme'
import type {Shape} from '../shape'
import type {Platform} from '../theme.interface'
import type {Typography} from '../typography'

export interface CreateTokenOptions {
	codeFontFamily?: string
	density?: UIDensity
	fontFamily?: string
	platform?: Platform
}

export interface Token {
	animated: ReturnType<typeof createAnimatedConfig>
	border: Border
	classes: Classes
	density: Density
	elevation: Elevation
	font: Font
	opacity: Opacity
	palette: Palette
	scheme: ColorScheme
	shape: Shape
	styleVariables?: Record<string, string>
	typography: Typography
}

export interface PaletteOptions {
	contrast?: Contrast
	scheme?: Scheme
}
