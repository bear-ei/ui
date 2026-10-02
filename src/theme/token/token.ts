import {createAnimatedConfig} from '../animated'
import {createBorder} from '../border'
import * as rawClasses from '../classes'
import {CONTRAST} from '../color'
import {createDensity, UI_DENSITY} from '../density'
import {createElevation} from '../elevation'
import {createFont} from '../font'
import {createOpacity} from '../opacity'
import type {PaletteType} from '../palette'
import {createPalette, PALETTE} from '../palette'
import {createColorScheme, SCHEME} from '../scheme'
import {createShape} from '../shape'
import {PLATFORM} from '../theme.enum'
import {createTypography} from '../typography'
import type {CreateTokenOptions, PaletteOptions, Token} from './token.interface'

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
			const speedScale = density === UI_DENSITY.COMPACT ? 0.7 : 1

			return {
				animated: createAnimatedConfig(speedScale),
				border: createBorder(),
				classes: rawClasses,
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
