import type {IconName} from './icon.interface'
import {outlined} from './icon.outlined'
export * from './icon-style'
export * from './icon.enum'
export * from './icon.interface'
export * from './icon.outlined'
export * from './icon.rounded'
export * from './icon.sharp'

export const ICON_NAME = Object.keys(outlined.OUTLINED).reduce(
	(accumulator, key) => ({...accumulator, [key]: key}),
	{}
) as Record<IconName, IconName>
