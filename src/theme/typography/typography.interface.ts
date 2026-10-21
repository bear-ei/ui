import type {Font, FontHeight, FontLetterSpacing, FontSize} from '../font'
import type {TYPOGRAPHY, TYPOGRAPHY_SIZE} from './typography.enum'

export type TypographyType = (typeof TYPOGRAPHY)[keyof typeof TYPOGRAPHY]
export type TypographySize = (typeof TYPOGRAPHY_SIZE)[keyof typeof TYPOGRAPHY_SIZE]
export interface CreateBuildStyleOptions {
	height: FontHeight
	letterSpacing: FontLetterSpacing
	prominent?: keyof Font['weight']
	size: FontSize
	weight: keyof Font['weight']
}

export interface FontStyle {
	height: number
	letterSpacing: number
	lineHeight: number
	prominentWeight?: number
	size: number
	style: string
	weight: number
}

export type TypographyStyle = Record<TypographySize, FontStyle>
export type Typography = Record<TypographyType, TypographyStyle>
