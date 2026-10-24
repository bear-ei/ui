import type {createAnimatedConfig} from '../animated'
import type {Border} from '../border'
import type {Classes} from '../classes'
import type {Contrast} from '../color'
import type {Density, UIDensity} from '../density'
import type {ElevationMap} from '../elevation'
import type {Font} from '../font'
import type {Opacity} from '../opacity'
import type {Palette} from '../palette'
import type {ColorMap, Scheme} from '../scheme'
import type {Shape} from '../shape'
import type {TargetPlatform} from '../theme.interface'
import type {Typography} from '../typography'

export interface CreateTokenOptions {
	codeFontFamily?: string
	density?: UIDensity
	fontFamily?: string
	platform?: TargetPlatform
}

export interface Token {
	animated: ReturnType<typeof createAnimatedConfig>
	border: Border
	classes: Classes
	colors: ColorMap
	density: Density
	elevation: ElevationMap
	font: Font
	opacity: Opacity
	palette: Palette
	shape: Shape
	typography: Typography
}

export interface ColorMapOptions {
	contrast?: Contrast
	scheme?: Scheme
}
