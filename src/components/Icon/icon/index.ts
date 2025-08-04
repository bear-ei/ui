import type {IconName} from './icon.interface'
import {rounded} from './icon.rounded'
export * from './icon.enum'
export * from './icon.interface'
export * from './icon.rounded'

export const ICON_NAME = Object.keys(rounded.OUTLINED).reduce(
	(accumulator, key) => ({...accumulator, [key]: key}),
	{}
) as Record<IconName, IconName>
