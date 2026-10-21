import {createAnimatedConfig} from '../animated'
import {createBorder} from '../border'
import {
	classesName,
	densityClasses,
	processStyleVariables as rawProcessStyleVariables,
	shapeClasses,
	typographyClasses
} from '../classes'
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

import type {ColorSchemeOptions, CreateTokenOptions, Token} from './token.interface'

/**
 * Token factory — curried in three layers by change frequency:
 *
 *   Layer 1 (CreateTokenOptions): app-level config — fonts, platform, density.
 *                                 Changes rarely.
 *   Layer 2 (ColorSchemeOptions): user preference — light/dark, contrast.
 *                                 Changes on theme switch.
 *   Layer 3 (PaletteType):        brand palette selection.
 *                                 Nearly never changes.
 *
 * The layering separates concerns, NOT for partial-application reuse.
 */
export const createToken = ({
	codeFontFamily,
	density = UI_DENSITY.COMPACT,
	fontFamily,
	// Default to macOS — the product's primary desktop target.
	// Windows / Linux support (future) must pass `platform` explicitly.
	platform = PLATFORM.MACOS
}: CreateTokenOptions = {}) => {
	const font = createFont(fontFamily)(codeFontFamily)(platform)

	return ({scheme = SCHEME.LIGHT, contrast = CONTRAST.STANDARD}: ColorSchemeOptions = {}) =>
		(palette: PaletteType = PALETTE.NAVY): Token => {
			const createdPalette = createPalette(palette)
			const colorScheme = createColorScheme(createdPalette)(scheme)(contrast)
			const classes = {
				classesName,
				densityClasses,
				processStyleVariables: rawProcessStyleVariables,
				shapeClasses,
				typographyClasses
			}

			return {
				animated: createAnimatedConfig(density),
				border: createBorder(),
				classes,
				density: createDensity(density),
				elevation: createElevation(density),
				font,
				opacity: createOpacity(),
				palette: createdPalette,
				scheme: colorScheme,
				shape: createShape(density),
				typography: createTypography(font)(density)
			}
		}
}
