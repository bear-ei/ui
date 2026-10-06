export type FontLetterSpacing =
	| 'letterSpacing0'
	| 'letterSpacing1'
	| 'letterSpacing2'
	| 'letterSpacing3'
	| 'letterSpacing4'
	| 'letterSpacing5'
	| 'letterSpacing6'

export type FontHeight =
	| 'height0'
	| 'height1'
	| 'height2'
	| 'height3'
	| 'height4'
	| 'height5'
	| 'height6'
	| 'height7'
	| 'height8'
	| 'height9'
	| 'height10'
	| 'height11'
	| 'height12'

export type FontLineHeight =
	| 'lineHeight0'
	| 'lineHeight1'
	| 'lineHeight2'
	| 'lineHeight3'
	| 'lineHeight4'
	| 'lineHeight5'
	| 'lineHeight6'
	| 'lineHeight7'
	| 'lineHeight8'
	| 'lineHeight9'
	| 'lineHeight10'
	| 'lineHeight11'
	| 'lineHeight12'

export type FontSize =
	| 'size0'
	| 'size1'
	| 'size2'
	| 'size3'
	| 'size4'
	| 'size5'
	| 'size6'
	| 'size7'
	| 'size8'
	| 'size9'
	| 'size10'
	| 'size11'
	| 'size12'

export interface Font {
	family: {codeFamily: string; family: string}
	height: Record<FontHeight, number>
	letterSpacing: Record<FontLetterSpacing, number>
	lineHeight: Record<FontLineHeight, number>
	size: Record<FontSize, number>
	style: {normal: string}
	weight: {bold: number; medium: number; regular: number}
}
