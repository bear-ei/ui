import type {ICON_TYPE} from './icon.enum'
import type {rounded} from './icon.rounded'

export type IconName = keyof typeof rounded.OUTLINED
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE]
