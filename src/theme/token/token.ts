import {createAnimatedConfig} from '../animated'
import {CONTRAST} from '../color'
import {createDensity, UI_DENSITY} from '../density'
import {createElevation} from '../elevation'
import {createFont} from '../font'
import {createOpacity} from '../opacity'
import type {PaletteType} from '../palette'
import {createPalette, PALETTE} from '../palette'
import {createColorScheme, SCHEME} from '../scheme'
import {createShape} from '../shape'
import {createTypography} from '../typography'
import {PLATFORM} from './token.enum'
import type {PaletteOptions, Token, CreateTokenOptions} from './token.interface'

export const createToken = ({
	codeFontFamily,
	density = UI_DENSITY.COMPACT,
	fontFamily,
	platform = PLATFORM.MACOS
}: CreateTokenOptions = {}) => {
	const font = createFont(fontFamily)(codeFontFamily)(platform)

	return ({scheme = SCHEME.LIGHT, contrast = CONTRAST.STANDARD}: PaletteOptions = {}) =>
		(palette: PaletteType = PALETTE.NAVY): Token => {
			const createdPalette = createPalette(palette)
			const colorScheme = createColorScheme(createdPalette)(scheme)(contrast)

			return {
				animated: createAnimatedConfig(density === UI_DENSITY.COMPACT ? 0.7 : 1),
				density: createDensity(density),
				elevation: createElevation(scheme)(colorScheme.shadow),
				font,
				opacity: createOpacity(),
				palette: createdPalette,
				scheme: colorScheme,
				shape: createShape(),
				typography: createTypography(font)(density)
			}
		}
}
