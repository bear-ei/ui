import {UI_DENSITY, type UIDensity} from '../density'
import type {Font, FontLineHeight} from '../font'
import {TYPOGRAPHY, TYPOGRAPHY_SIZE} from './typography.enum'
import type {CreateBuildStyleOptions, FontStyle, GetStyleOptions, Typography} from './typography.interface'

const createBuildStyle =
	(font: Font) =>
	({size, height, letterSpacing, weight, prominent}: CreateBuildStyleOptions): FontStyle => {
		const index = size.replace('size', '')
		const lineHeight = `lineHeight${index}` as FontLineHeight

		return {
			...(prominent && {prominent: {weight: font.weight[prominent]}}),
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
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				weight: 'regular'
			}),

			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height5',
				letterSpacing: 'letterSpacing1',
				size: 'size5',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height4',
				letterSpacing: 'letterSpacing1',
				size: 'size4',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing1',
				size: 'size3',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing1',
				size: 'size3',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing4',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing3',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing6',
				size: 'size1',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing5',
				size: 'size0',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing3',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				prominent: 'bold',
				size: 'size0',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				size: 'size0',
				weight: 'medium'
			})
		}

		const comfortableMap: Record<string, FontStyle> = {
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height10',
				letterSpacing: 'letterSpacing0',
				size: 'size10',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height9',
				letterSpacing: 'letterSpacing1',
				size: 'size9',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.DISPLAY}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.HEADLINE}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height5',
				letterSpacing: 'letterSpacing1',
				size: 'size5',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height4',
				letterSpacing: 'letterSpacing1',
				size: 'size4',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing4',
				size: 'size3',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.TITLE}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing3',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height3',
				letterSpacing: 'letterSpacing6',
				size: 'size3',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			}),
			[`${TYPOGRAPHY.BODY}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing5',
				size: 'size1',
				weight: 'regular'
			}),

			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.LARGE}`]: buildStyle({
				height: 'height2',
				letterSpacing: 'letterSpacing3',
				prominent: 'bold',
				size: 'size2',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.MEDIUM}`]: buildStyle({
				height: 'height1',
				letterSpacing: 'letterSpacing6',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			}),
			[`${TYPOGRAPHY.LABEL}.${TYPOGRAPHY_SIZE.SMALL}`]: buildStyle({
				height: 'height0',
				letterSpacing: 'letterSpacing6',
				size: 'size0',
				weight: 'medium'
			})
		}

		const map = isCompact ? compactMap : comfortableMap
		const getStyle = ({type, size}: GetStyleOptions): FontStyle =>
			map[`${type}.${size}`] ?? map[`${type}.${TYPOGRAPHY_SIZE.MEDIUM}`]

		return {
			[TYPOGRAPHY.DISPLAY]: {
				[TYPOGRAPHY_SIZE.LARGE]: getStyle({type: TYPOGRAPHY.DISPLAY, size: TYPOGRAPHY_SIZE.LARGE}),
				[TYPOGRAPHY_SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.DISPLAY, size: TYPOGRAPHY_SIZE.MEDIUM}),
				[TYPOGRAPHY_SIZE.SMALL]: getStyle({type: TYPOGRAPHY.DISPLAY, size: TYPOGRAPHY_SIZE.SMALL})
			},
			[TYPOGRAPHY.HEADLINE]: {
				[TYPOGRAPHY_SIZE.LARGE]: getStyle({type: TYPOGRAPHY.HEADLINE, size: TYPOGRAPHY_SIZE.LARGE}),
				[TYPOGRAPHY_SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.HEADLINE, size: TYPOGRAPHY_SIZE.MEDIUM}),
				[TYPOGRAPHY_SIZE.SMALL]: getStyle({type: TYPOGRAPHY.HEADLINE, size: TYPOGRAPHY_SIZE.SMALL})
			},
			[TYPOGRAPHY.TITLE]: {
				[TYPOGRAPHY_SIZE.LARGE]: getStyle({type: TYPOGRAPHY.TITLE, size: TYPOGRAPHY_SIZE.LARGE}),
				[TYPOGRAPHY_SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.TITLE, size: TYPOGRAPHY_SIZE.MEDIUM}),
				[TYPOGRAPHY_SIZE.SMALL]: getStyle({type: TYPOGRAPHY.TITLE, size: TYPOGRAPHY_SIZE.SMALL})
			},
			[TYPOGRAPHY.BODY]: {
				[TYPOGRAPHY_SIZE.LARGE]: getStyle({type: TYPOGRAPHY.BODY, size: TYPOGRAPHY_SIZE.LARGE}),
				[TYPOGRAPHY_SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.BODY, size: TYPOGRAPHY_SIZE.MEDIUM}),
				[TYPOGRAPHY_SIZE.SMALL]: getStyle({type: TYPOGRAPHY.BODY, size: TYPOGRAPHY_SIZE.SMALL})
			},
			[TYPOGRAPHY.LABEL]: {
				[TYPOGRAPHY_SIZE.LARGE]: getStyle({type: TYPOGRAPHY.LABEL, size: TYPOGRAPHY_SIZE.LARGE}),
				[TYPOGRAPHY_SIZE.MEDIUM]: getStyle({type: TYPOGRAPHY.LABEL, size: TYPOGRAPHY_SIZE.MEDIUM}),
				[TYPOGRAPHY_SIZE.SMALL]: getStyle({type: TYPOGRAPHY.LABEL, size: TYPOGRAPHY_SIZE.SMALL})
			}
		}
	}
