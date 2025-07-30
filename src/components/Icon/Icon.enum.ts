import type {IconName} from './Icon.interface'
import {outlined} from './Icon.outlined'

export const ICON_STYLE = {
	OUTLINED: 'OUTLINED',
	ROUNDED: 'ROUNDED',
	SHARP: 'SHARP'
} as const

export const ICON_TYPE = {
	FILLED: 'FILLED',
	OUTLINED: 'OUTLINED'
} as const

export const ICON_NAME = Object.keys(outlined.OUTLINED).reduce(
	(accumulator, key) => ({...accumulator, [key]: key}),
	{}
) as Record<IconName, IconName>
