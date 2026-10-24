import type {Font, FontLineHeight} from '../font'
import type {BuildFontStyleOptions, FontStyle, Typography} from './typography.interface'

import {DENSITY_SIZE, UI_DENSITY, type DensitySizeScale, type UIDensity} from '../density'
import {TYPOGRAPHY, TYPOGRAPHY_SIZE} from './typography.enum'

const DENSITY_SIZE_TYPOGRAPHY_SIZE_MAP = {
	[DENSITY_SIZE.LARGE]: TYPOGRAPHY_SIZE.LARGE,
	[DENSITY_SIZE.MEDIUM]: TYPOGRAPHY_SIZE.MEDIUM,
	[DENSITY_SIZE.SMALL]: TYPOGRAPHY_SIZE.SMALL,
	[DENSITY_SIZE.X_LARGE]: TYPOGRAPHY_SIZE.LARGE,
	[DENSITY_SIZE.X_SMALL]: TYPOGRAPHY_SIZE.SMALL,
	[DENSITY_SIZE.XX_LARGE]: TYPOGRAPHY_SIZE.LARGE,
	[DENSITY_SIZE.XX_SMALL]: TYPOGRAPHY_SIZE.SMALL
}

const TYPOGRAPHY_CONFIG = {
	[UI_DENSITY.COMFORTABLE]: {
		[TYPOGRAPHY.BODY]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height3',
				letterSpacing: 'letterSpacing2',
				size: 'size3',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height1',
				letterSpacing: 'letterSpacing2',
				size: 'size1',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.DISPLAY]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height12',
				letterSpacing: 'letterSpacing0',
				size: 'size12',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height11',
				letterSpacing: 'letterSpacing1',
				size: 'size11',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height10',
				letterSpacing: 'letterSpacing1',
				size: 'size10',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.HEADLINE]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height9',
				letterSpacing: 'letterSpacing1',
				size: 'size9',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.LABEL]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				prominent: 'bold',
				size: 'size2',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height1',
				letterSpacing: 'letterSpacing2',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height0',
				letterSpacing: 'letterSpacing2',
				size: 'size0',
				weight: 'medium'
			}
		},
		[TYPOGRAPHY.TITLE]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				// M3 baseline: Title Large uses weight 400 (regular).
				// COMPACT overrides to 'medium' — intentional desktop emphasis.
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height3',
				letterSpacing: 'letterSpacing2',
				size: 'size3',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'medium'
			}
		}
	},
	[UI_DENSITY.COMPACT]: {
		[TYPOGRAPHY.BODY]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height3',
				letterSpacing: 'letterSpacing2',
				size: 'size3',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height1',
				letterSpacing: 'letterSpacing2',
				size: 'size1',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.DISPLAY]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height10',
				letterSpacing: 'letterSpacing1',
				size: 'size10',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height9',
				letterSpacing: 'letterSpacing1',
				size: 'size9',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height8',
				letterSpacing: 'letterSpacing1',
				size: 'size8',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.HEADLINE]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height7',
				letterSpacing: 'letterSpacing1',
				size: 'size7',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height6',
				letterSpacing: 'letterSpacing1',
				size: 'size6',
				weight: 'regular'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height5',
				letterSpacing: 'letterSpacing2',
				size: 'size5',
				weight: 'regular'
			}
		},
		[TYPOGRAPHY.LABEL]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				prominent: 'bold',
				size: 'size2',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height1',
				letterSpacing: 'letterSpacing2',
				prominent: 'bold',
				size: 'size1',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height0',
				letterSpacing: 'letterSpacing2',
				size: 'size0',
				weight: 'medium'
			}
		},
		[TYPOGRAPHY.TITLE]: {
			[TYPOGRAPHY_SIZE.LARGE]: {
				height: 'height4',
				letterSpacing: 'letterSpacing2',
				size: 'size4',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.MEDIUM]: {
				height: 'height3',
				letterSpacing: 'letterSpacing2',
				size: 'size3',
				weight: 'medium'
			},
			[TYPOGRAPHY_SIZE.SMALL]: {
				height: 'height2',
				letterSpacing: 'letterSpacing2',
				size: 'size2',
				weight: 'medium'
			}
		}
	}
}

const buildStyle = (font: Font, {height, letterSpacing, prominent, size, weight}: BuildFontStyleOptions): FontStyle => {
	const index = size.replace('size', '')
	const lineHeight = `lineHeight${index}` as FontLineHeight
	const lineHeightRatio = font.lineHeight[lineHeight]

	return {
		...(prominent && {prominentWeight: font.weight[prominent]}),
		height: font.height[height],
		letterSpacing: font.letterSpacing[letterSpacing],
		lineHeight: Math.round(font.size[size] * lineHeightRatio),
		size: font.size[size],
		style: font.style.normal,
		weight: font.weight[weight]
	}
}

const createTypography = (font: Font, density: UIDensity = UI_DENSITY.COMPACT): Typography => {
	const config = TYPOGRAPHY_CONFIG[density]
	const buildTypography = ([type, sizes]: [type: string, sizes: (typeof config)['BODY']]) => [
		type,
		Object.fromEntries(
			Object.entries(sizes).map(([size, options]) => [size, buildStyle(font, options as BuildFontStyleOptions)])
		)
	]

	return Object.fromEntries(Object.entries(config).map(buildTypography))
}

const toTypographySize = (densitySize: DensitySizeScale) => DENSITY_SIZE_TYPOGRAPHY_SIZE_MAP[densitySize]

export {createTypography, toTypographySize}
