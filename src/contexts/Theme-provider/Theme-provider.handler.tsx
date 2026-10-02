import {vars} from 'nativewind'
import {SHAPE, SIZE, type Token} from '../../theme'
import {platformValue} from '../../utils'

const TYPOGRAPHY_PLATFORM_VALUE_KEYS = [
	'height',
	'lineHeight',
	'size',
	SHAPE.FULL,
	SHAPE.TINY_SMALL,
	SIZE.EXTRA_LARGE,
	SIZE.EXTRA_SMALL,
	SIZE.LARGE,
	SIZE.MEDIUM,
	SIZE.NONE,
	SIZE.SMALL
]
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

export const processStyleVariables = ({scheme, font, density, shape, typography, border}: Token) =>
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
		...createCssVariables(shape.size)('shape')(TYPOGRAPHY_PLATFORM_VALUE_KEYS),
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
