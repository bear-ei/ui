import {UI_DENSITY, type UIDensity} from '../density'
import type {Font, FontLineHeight} from '../font'
import {SIZE} from '../theme.enum'
import {TYPOGRAPHY} from './typography.enum'
import type {
	CreateBuildStyleOptions,
	FontStyle,
	Typography,
	TypographySize,
	TypographyType
} from './typography.interface'

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
		const compactMap: Record<TypographyType, Record<TypographySize, FontStyle>> = {
			[TYPOGRAPHY.DISPLAY]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height10',
					letterSpacing: 'letterSpacing1',
					size: 'size10',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height9',
					letterSpacing: 'letterSpacing1',
					size: 'size9',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height8',
					letterSpacing: 'letterSpacing1',
					size: 'size8',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.HEADLINE]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height7',
					letterSpacing: 'letterSpacing1',
					size: 'size7',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height6',
					letterSpacing: 'letterSpacing1',
					size: 'size6',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height5',
					letterSpacing: 'letterSpacing2',
					size: 'size5',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.TITLE]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height4',
					letterSpacing: 'letterSpacing2',
					size: 'size4',
					weight: 'medium'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height3',
					letterSpacing: 'letterSpacing2',
					size: 'size3',
					weight: 'medium'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					size: 'size2',
					weight: 'medium'
				})
			},
			[TYPOGRAPHY.BODY]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height3',
					letterSpacing: 'letterSpacing2',
					size: 'size3',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					size: 'size2',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height1',
					letterSpacing: 'letterSpacing2',
					size: 'size1',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.LABEL]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					prominent: 'bold',
					size: 'size2',
					weight: 'medium'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height1',
					letterSpacing: 'letterSpacing2',
					prominent: 'bold',
					size: 'size1',
					weight: 'medium'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height0',
					letterSpacing: 'letterSpacing2',
					size: 'size0',
					weight: 'medium'
				})
			}
		}

		const comfortableMap: Record<TypographyType, Record<TypographySize, FontStyle>> = {
			[TYPOGRAPHY.DISPLAY]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height12',
					letterSpacing: 'letterSpacing0',
					size: 'size12',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height11',
					letterSpacing: 'letterSpacing1',
					size: 'size11',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height10',
					letterSpacing: 'letterSpacing1',
					size: 'size10',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.HEADLINE]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height9',
					letterSpacing: 'letterSpacing1',
					size: 'size9',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height8',
					letterSpacing: 'letterSpacing1',
					size: 'size8',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height7',
					letterSpacing: 'letterSpacing1',
					size: 'size7',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.TITLE]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height6',
					letterSpacing: 'letterSpacing1',
					size: 'size6',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height3',
					letterSpacing: 'letterSpacing2',
					size: 'size3',
					weight: 'medium'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					size: 'size2',
					weight: 'medium'
				})
			},
			[TYPOGRAPHY.BODY]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height3',
					letterSpacing: 'letterSpacing2',
					size: 'size3',
					weight: 'regular'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					size: 'size2',
					weight: 'regular'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height1',
					letterSpacing: 'letterSpacing2',
					size: 'size1',
					weight: 'regular'
				})
			},
			[TYPOGRAPHY.LABEL]: {
				[SIZE.LARGE]: buildStyle({
					height: 'height2',
					letterSpacing: 'letterSpacing2',
					prominent: 'bold',
					size: 'size2',
					weight: 'medium'
				}),
				[SIZE.MEDIUM]: buildStyle({
					height: 'height1',
					letterSpacing: 'letterSpacing2',
					prominent: 'bold',
					size: 'size1',
					weight: 'medium'
				}),
				[SIZE.SMALL]: buildStyle({
					height: 'height0',
					letterSpacing: 'letterSpacing2',
					size: 'size0',
					weight: 'medium'
				})
			}
		}

		const map = isCompact ? compactMap : comfortableMap

		return {
			[TYPOGRAPHY.DISPLAY]: {
				[SIZE.LARGE]: map[TYPOGRAPHY.DISPLAY][SIZE.LARGE],
				[SIZE.MEDIUM]: map[TYPOGRAPHY.DISPLAY][SIZE.MEDIUM],
				[SIZE.SMALL]: map[TYPOGRAPHY.DISPLAY][SIZE.SMALL]
			},
			[TYPOGRAPHY.HEADLINE]: {
				[SIZE.LARGE]: map[TYPOGRAPHY.HEADLINE][SIZE.LARGE],
				[SIZE.MEDIUM]: map[TYPOGRAPHY.HEADLINE][SIZE.MEDIUM],
				[SIZE.SMALL]: map[TYPOGRAPHY.HEADLINE][SIZE.SMALL]
			},
			[TYPOGRAPHY.TITLE]: {
				[SIZE.LARGE]: map[TYPOGRAPHY.TITLE][SIZE.LARGE],
				[SIZE.MEDIUM]: map[TYPOGRAPHY.TITLE][SIZE.MEDIUM],
				[SIZE.SMALL]: map[TYPOGRAPHY.TITLE][SIZE.SMALL]
			},
			[TYPOGRAPHY.BODY]: {
				[SIZE.LARGE]: map[TYPOGRAPHY.BODY][SIZE.LARGE],
				[SIZE.MEDIUM]: map[TYPOGRAPHY.BODY][SIZE.MEDIUM],
				[SIZE.SMALL]: map[TYPOGRAPHY.BODY][SIZE.SMALL]
			},
			[TYPOGRAPHY.LABEL]: {
				[SIZE.LARGE]: map[TYPOGRAPHY.LABEL][SIZE.LARGE],
				[SIZE.MEDIUM]: map[TYPOGRAPHY.LABEL][SIZE.MEDIUM],
				[SIZE.SMALL]: map[TYPOGRAPHY.LABEL][SIZE.SMALL]
			}
		}
	}
