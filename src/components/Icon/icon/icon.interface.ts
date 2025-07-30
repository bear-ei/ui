import type {ICON_STYLE, ICON_TYPE} from './icon.enum'
import type {outlined} from './icon.outlined'

export type IconName = keyof typeof outlined.OUTLINED
export type IconStyle = (typeof ICON_STYLE)[keyof typeof ICON_STYLE]
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE]
