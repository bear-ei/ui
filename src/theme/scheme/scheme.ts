import type {Contrast} from '../color'
import type {Palette} from '../palette'

import type {ColorScheme, Scheme} from './scheme.interface'

const createColorScheme =
	(palette: Palette) =>
	(scheme: Scheme) =>
	(contrast: Contrast): ColorScheme =>
		palette[scheme][contrast]

export {createColorScheme}
