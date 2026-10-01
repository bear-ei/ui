import {SIZE} from '../token'
import {UI_DENSITY, type UIDensity} from '../density'
import type {Font, FontLineHeight} from '../font'
import {TYPOGRAPHY} from './typography.enum'
import type {CreateBuildStyleOptions, FontStyle, GetStyleOptions, Typography} from './typography.interface'

const createBuildStyle =
	(font: Font) =>
	({size, height, letterSpacing, weight, prominent}: CreateBuildStyleOptions): FontStyle => {
		const index = size.replace('size', '')
		const lineHeight = `lineHeight${index}` as FontLineHeight

		return {
			...(prominent && {prominentWeight: font.weight[prominent]}),
			height: font.height[height],
			letterSpacing: font.letterSpacing[letterSpacing],
			lineHeight: Math.round(font.size[size] * (font.lineHeight[lineHeight] ?? 0)),
			size: font.size[size],
			style: font.style.normal,
			weight: font.weight[weight]
		}
	}

export const createTypography =
	(font: Font) =>
	(density: UIDensity = UI_DENSITY.COMPACT): Typography => {
		const isCompact = density === UI_DENSITY.COMPACT
		const buildStyle = createBuildStyle(font)
		const compactMap: Record<string, FontStyle> = {
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.LARGE}`]: buildStyle({
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.SMALL}`]: buildStyle({
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				weight: 'regular'
			}),

			[`${TYPOGRAPHY.HEADLINE}.${SIZE.LARGE}`]: buildStyle({
				height: 'height5',
				letterSpacing: 'letterSpacing1',
				size: 'size5',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height4',
				letterSpacing: 'letterSpacing1',
				size: 'size4',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${SIZE.SMALL}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing1',
				size: 'size3',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.LARGE}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing1',
				size: 'size3',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing4',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.SMALL}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing3',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.LARGE}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing6',
				size: 'size1',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing5',
				size: 'size0',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.LABEL}.${SIZE.LARGE}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing3',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				prominent: 'bold',
				size: 'size0',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				size: 'size0',
				weight: 'medium'
			})
		}

		const comfortableMap: Record<string, FontStyle> = {
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.LARGE}`]: buildStyle({
				height: 'height10',
				letterSpacing: 'letterSpacing0',
				size: 'size10',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height9',
				letterSpacing: 'letterSpacing1',
				size: 'size9',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${SIZE.SMALL}`]: buildStyle({
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${SIZE.LARGE}`]: buildStyle({
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${SIZE.SMALL}`]: buildStyle({
				height: 'height5',
				letterSpacing: 'letterSpacing1',
				size: 'size5',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.LARGE}`]: buildStyle({
				height: 'height4',
				letterSpacing: 'letterSpacing1',
				size: 'size4',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing4',
				size: 'size3',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${SIZE.SMALL}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing3',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.LARGE}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing6',
				size: 'size3',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${SIZE.SMALL}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing5',
				size: 'size1',
				weight: 'regular'
			}),

			[`${TYPOGRAPHY.LABEL}.${SIZE.LARGE}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing3',
				prominent: 'bold',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${SIZE.MEDIUM}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing6',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				size: 'size0',
				weight: 'medium'
			})
		}

		const map = isCompact ? compactMap : comfortableMap
		const getStyle = ({type, size}: GetStyleOptions): FontStyle =>
			map[`${type}.${size}`] ?? map[`${type}.${SIZE.MEDIUM}`]

		return {
			[TYPOGRAPHY.DISPLAY]: {
				[SIZE.LARGE]: getStyle({type: TYPOGRAPHY.DISPLAY, size: SIZE.LARGE}),
				[SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.DISPLAY, size: SIZE.MEDIUM}),
				[SIZE.SMALL]: getStyle({type: TYPOGRAPHY.DISPLAY, size: SIZE.SMALL})
			},
			[TYPOGRAPHY.HEADLINE]: {
				[SIZE.LARGE]: getStyle({type: TYPOGRAPHY.HEADLINE, size: SIZE.LARGE}),
				[SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.HEADLINE, size: SIZE.MEDIUM}),
				[SIZE.SMALL]: getStyle({type: TYPOGRAPHY.HEADLINE, size: SIZE.SMALL})
			},
			[TYPOGRAPHY.TITLE]: {
				[SIZE.LARGE]: getStyle({type: TYPOGRAPHY.TITLE, size: SIZE.LARGE}),
				[SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.TITLE, size: SIZE.MEDIUM}),
				[SIZE.SMALL]: getStyle({type: TYPOGRAPHY.TITLE, size: SIZE.SMALL})
			},
			[TYPOGRAPHY.BODY]: {
				[SIZE.LARGE]: getStyle({type: TYPOGRAPHY.BODY, size: SIZE.LARGE}),
				[SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.BODY, size: SIZE.MEDIUM}),
				[SIZE.SMALL]: getStyle({type: TYPOGRAPHY.BODY, size: SIZE.SMALL})
			},
			[TYPOGRAPHY.LABEL]: {
				[SIZE.LARGE]: getStyle({type: TYPOGRAPHY.LABEL, size: SIZE.LARGE}),
				[SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.LABEL, size: SIZE.MEDIUM}),
				[SIZE.SMALL]: getStyle({type: TYPOGRAPHY.LABEL, size: SIZE.SMALL})
			}
		}
	}
