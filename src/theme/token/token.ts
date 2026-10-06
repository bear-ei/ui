import {vars} from 'nativewind'
import {platformValue} from '../../utils'
import {createAnimatedConfig} from '../animated'
import {createBorder} from '../border'
import * as rawClasses from '../classes'
import {CONTRAST} from '../color'
import {createDensity, DENSITY_SIZE, UI_DENSITY} from '../density'
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

const TYPOGRAPHY_PLATFORM_VALUE_KEYS = ['height', 'lineHeight', 'size', ...Object.keys(DENSITY_SIZE)]
const toKebabCase = (value: string) =>
	value
		.replace(/_/g, '-')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/^-/, '')

const createCssVariables =
	<T extends object>(obj: T) =>
	(prefix: string) =>
	(platformValueKeys?: string[]) =>
		Object.entries(obj).reduce(
			(accumulator, [key, value]) => ({
				...accumulator,
				[`${prefix}-${toKebabCase(key)}`]:
					platformValueKeys ?
						platformValueKeys.includes(key) && typeof value === 'number' ?
							platformValue(value)
						:	value
					:	value
			}),
			{}
		)

const processStyleVariables = ({scheme, font, density, shape, typography, border}: Token) =>
	vars({
		...createCssVariables(border)('border')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.control)('density-control')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.icon)('density-icon')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.inline)('density-inline')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.inset)('density-inset')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.layout)('density-layout')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(density.spacing)('density-spacing')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(font.family)('font')(),
		...createCssVariables(scheme)('color')(),
		...createCssVariables(shape.radius)('radius')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.BODY.LARGE)('typography-body-large')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.BODY.MEDIUM)('typography-body-medium')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.BODY.SMALL)('typography-body-small')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.DISPLAY.LARGE)('typography-display-large')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.DISPLAY.MEDIUM)('typography-display-medium')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.DISPLAY.SMALL)('typography-display-small')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.HEADLINE.LARGE)('typography-headline-large')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.HEADLINE.MEDIUM)('typography-headline-medium')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.HEADLINE.SMALL)('typography-headline-small')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.LABEL.LARGE)('typography-label-large')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.LABEL.MEDIUM)('typography-label-medium')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.LABEL.SMALL)('typography-label-small')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.TITLE.LARGE)('typography-title-large')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.TITLE.MEDIUM)('typography-title-medium')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
		...createCssVariables(typography.TITLE.SMALL)('typography-title-small')(TYPOGRAPHY_PLATFORM_VALUE_KEYS)
	})

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
			const token = {
				animated: createAnimatedConfig(density),
				border: createBorder(),
				classes: rawClasses,
				density: createDensity(density),
				elevation: createElevation(density)(colorScheme.shadow),
				font,
				opacity: createOpacity(),
				palette: createdPalette,
				scheme: colorScheme,
				shape: createShape(density),
				typography: createTypography(font)(density)
			}

			return {...token, styleVariables: processStyleVariables(token)}
		}
}
