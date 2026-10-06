import {UI_DENSITY, type UIDensity} from '../density'
import type {Font, FontLineHeight} from '../font'
import {TYPOGRAPHY, TYPOGRAPHY_SIZE} from './typography.enum'
import type {CreateBuildStyleOptions, FontStyle, Typography} from './typography.interface'

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
		const buildStyle = createBuildStyle(font)
		const densityMap = {
			[UI_DENSITY.COMPACT]: {
				[TYPOGRAPHY.DISPLAY]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height10',
						letterSpacing: 'letterSpacing1',
						size: 'size10',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height9',
						letterSpacing: 'letterSpacing1',
						size: 'size9',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height8',
						letterSpacing: 'letterSpacing1',
						size: 'size8',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.HEADLINE]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height7',
						letterSpacing: 'letterSpacing1',
						size: 'size7',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height6',
						letterSpacing: 'letterSpacing1',
						size: 'size6',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height5',
						letterSpacing: 'letterSpacing2',
						size: 'size5',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.TITLE]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height4',
						letterSpacing: 'letterSpacing2',
						size: 'size4',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height3',
						letterSpacing: 'letterSpacing2',
						size: 'size3',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						size: 'size2',
						weight: 'medium'
					})
				},
				[TYPOGRAPHY.BODY]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height3',
						letterSpacing: 'letterSpacing2',
						size: 'size3',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						size: 'size2',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height1',
						letterSpacing: 'letterSpacing2',
						size: 'size1',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.LABEL]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						prominent: 'bold',
						size: 'size2',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height1',
						letterSpacing: 'letterSpacing2',
						prominent: 'bold',
						size: 'size1',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height0',
						letterSpacing: 'letterSpacing2',
						size: 'size0',
						weight: 'medium'
					})
				}
			},
			[UI_DENSITY.COMFORTABLE]: {
				[TYPOGRAPHY.DISPLAY]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height12',
						letterSpacing: 'letterSpacing0',
						size: 'size12',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height11',
						letterSpacing: 'letterSpacing1',
						size: 'size11',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height10',
						letterSpacing: 'letterSpacing1',
						size: 'size10',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.HEADLINE]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height9',
						letterSpacing: 'letterSpacing1',
						size: 'size9',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height8',
						letterSpacing: 'letterSpacing1',
						size: 'size8',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height7',
						letterSpacing: 'letterSpacing1',
						size: 'size7',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.TITLE]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height6',
						letterSpacing: 'letterSpacing1',
						size: 'size6',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height3',
						letterSpacing: 'letterSpacing2',
						size: 'size3',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						size: 'size2',
						weight: 'medium'
					})
				},
				[TYPOGRAPHY.BODY]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height3',
						letterSpacing: 'letterSpacing2',
						size: 'size3',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						size: 'size2',
						weight: 'regular'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height1',
						letterSpacing: 'letterSpacing2',
						size: 'size1',
						weight: 'regular'
					})
				},
				[TYPOGRAPHY.LABEL]: {
					[TYPOGRAPHY_SIZE.LARGE]: buildStyle({
						height: 'height2',
						letterSpacing: 'letterSpacing2',
						prominent: 'bold',
						size: 'size2',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.MEDIUM]: buildStyle({
						height: 'height1',
						letterSpacing: 'letterSpacing2',
						prominent: 'bold',
						size: 'size1',
						weight: 'medium'
					}),
					[TYPOGRAPHY_SIZE.SMALL]: buildStyle({
						height: 'height0',
						letterSpacing: 'letterSpacing2',
						size: 'size0',
						weight: 'medium'
					})
				}
			}
		}

		const map = densityMap[density]

		return {
			[TYPOGRAPHY.DISPLAY]: {
				[TYPOGRAPHY_SIZE.LARGE]: map[TYPOGRAPHY.DISPLAY][TYPOGRAPHY_SIZE.LARGE],
				[TYPOGRAPHY_SIZE.MEDIUM]: map[TYPOGRAPHY.DISPLAY][TYPOGRAPHY_SIZE.MEDIUM],
				[TYPOGRAPHY_SIZE.SMALL]: map[TYPOGRAPHY.DISPLAY][TYPOGRAPHY_SIZE.SMALL]
			},
			[TYPOGRAPHY.HEADLINE]: {
				[TYPOGRAPHY_SIZE.LARGE]: map[TYPOGRAPHY.HEADLINE][TYPOGRAPHY_SIZE.LARGE],
				[TYPOGRAPHY_SIZE.MEDIUM]: map[TYPOGRAPHY.HEADLINE][TYPOGRAPHY_SIZE.MEDIUM],
				[TYPOGRAPHY_SIZE.SMALL]: map[TYPOGRAPHY.HEADLINE][TYPOGRAPHY_SIZE.SMALL]
			},
			[TYPOGRAPHY.TITLE]: {
				[TYPOGRAPHY_SIZE.LARGE]: map[TYPOGRAPHY.TITLE][TYPOGRAPHY_SIZE.LARGE],
				[TYPOGRAPHY_SIZE.MEDIUM]: map[TYPOGRAPHY.TITLE][TYPOGRAPHY_SIZE.MEDIUM],
				[TYPOGRAPHY_SIZE.SMALL]: map[TYPOGRAPHY.TITLE][TYPOGRAPHY_SIZE.SMALL]
			},
			[TYPOGRAPHY.BODY]: {
				[TYPOGRAPHY_SIZE.LARGE]: map[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.LARGE],
				[TYPOGRAPHY_SIZE.MEDIUM]: map[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.MEDIUM],
				[TYPOGRAPHY_SIZE.SMALL]: map[TYPOGRAPHY.BODY][TYPOGRAPHY_SIZE.SMALL]
			},
			[TYPOGRAPHY.LABEL]: {
				[TYPOGRAPHY_SIZE.LARGE]: map[TYPOGRAPHY.LABEL][TYPOGRAPHY_SIZE.LARGE],
				[TYPOGRAPHY_SIZE.MEDIUM]: map[TYPOGRAPHY.LABEL][TYPOGRAPHY_SIZE.MEDIUM],
				[TYPOGRAPHY_SIZE.SMALL]: map[TYPOGRAPHY.LABEL][TYPOGRAPHY_SIZE.SMALL]
			}
		}
	}
