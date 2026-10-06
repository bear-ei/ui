import {UI_DENSITY, type UIDensity} from '../density'
import {RADIUS, SHAPE} from './shape.enum'
import type {Shape} from './shape.interface'

export const createShape = (density: UIDensity = UI_DENSITY.COMPACT): Shape => {
	const isCompact = density === UI_DENSITY.COMPACT
	const radius = {
		[RADIUS.FULL]: 9999,
		[RADIUS.LARGE]: isCompact ? 12 : 16,
		[RADIUS.MEDIUM]: isCompact ? 8 : 12,
		[RADIUS.NONE]: 0,
		[RADIUS.SMALL]: isCompact ? 6 : 8,
		[RADIUS.X_LARGE]: isCompact ? 16 : 24,
		[RADIUS.X_SMALL]: 4,
		[RADIUS.XX_LARGE]: isCompact ? 24 : 32,
		[RADIUS.XX_SMALL]: 2
	}

	return {
		radius: radius,
		[RADIUS.XX_LARGE]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.XX_LARGE],
				bottomRight: radius[RADIUS.XX_LARGE],
				topLeft: radius[RADIUS.XX_LARGE],
				topRight: radius[RADIUS.XX_LARGE]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.XX_LARGE],
				topRight: radius[RADIUS.XX_LARGE]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.XX_LARGE],
				bottomRight: radius[RADIUS.XX_LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.XX_LARGE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.XX_LARGE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.XX_LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.XX_LARGE]
			}
		},
		[RADIUS.X_LARGE]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.X_LARGE],
				bottomRight: radius[RADIUS.X_LARGE],
				topLeft: radius[RADIUS.X_LARGE],
				topRight: radius[RADIUS.X_LARGE]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.X_LARGE],
				topRight: radius[RADIUS.X_LARGE]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.X_LARGE],
				bottomRight: radius[RADIUS.X_LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.X_LARGE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.X_LARGE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.X_LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.X_LARGE]
			}
		},
		[RADIUS.X_SMALL]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.X_SMALL],
				bottomRight: radius[RADIUS.X_SMALL],
				topLeft: radius[RADIUS.X_SMALL],
				topRight: radius[RADIUS.X_SMALL]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.X_SMALL],
				topRight: radius[RADIUS.X_SMALL]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.X_SMALL],
				bottomRight: radius[RADIUS.X_SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.X_SMALL],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.X_SMALL],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.X_SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.X_SMALL]
			}
		},
		[RADIUS.FULL]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.FULL],
				bottomRight: radius[RADIUS.FULL],
				topLeft: radius[RADIUS.FULL],
				topRight: radius[RADIUS.FULL]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.FULL],
				topRight: radius[RADIUS.FULL]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.FULL],
				bottomRight: radius[RADIUS.FULL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.FULL],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.FULL],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.FULL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.FULL]
			}
		},
		[RADIUS.LARGE]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.LARGE],
				bottomRight: radius[RADIUS.LARGE],
				topLeft: radius[RADIUS.LARGE],
				topRight: radius[RADIUS.LARGE]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.LARGE],
				topRight: radius[RADIUS.LARGE]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.LARGE],
				bottomRight: radius[RADIUS.LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.LARGE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.LARGE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.LARGE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.LARGE]
			}
		},
		[RADIUS.MEDIUM]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.MEDIUM],
				bottomRight: radius[RADIUS.MEDIUM],
				topLeft: radius[RADIUS.MEDIUM],
				topRight: radius[RADIUS.MEDIUM]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.MEDIUM],
				topRight: radius[RADIUS.MEDIUM]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.MEDIUM],
				bottomRight: radius[RADIUS.MEDIUM],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.MEDIUM],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.MEDIUM],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.MEDIUM],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.MEDIUM]
			}
		},
		[RADIUS.NONE]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			}
		},
		[RADIUS.SMALL]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.SMALL],
				bottomRight: radius[RADIUS.SMALL],
				topLeft: radius[RADIUS.SMALL],
				topRight: radius[RADIUS.SMALL]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.SMALL],
				topRight: radius[RADIUS.SMALL]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.SMALL],
				bottomRight: radius[RADIUS.SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.SMALL],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.SMALL],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.SMALL]
			}
		},
		[RADIUS.XX_SMALL]: {
			[SHAPE.ALL]: {
				bottomLeft: radius[RADIUS.XX_SMALL],
				bottomRight: radius[RADIUS.XX_SMALL],
				topLeft: radius[RADIUS.XX_SMALL],
				topRight: radius[RADIUS.XX_SMALL]
			},
			[SHAPE.TOP]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.XX_SMALL],
				topRight: radius[RADIUS.XX_SMALL]
			},
			[SHAPE.BOTTOM]: {
				bottomLeft: radius[RADIUS.XX_SMALL],
				bottomRight: radius[RADIUS.XX_SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.START]: {
				bottomLeft: radius[RADIUS.XX_SMALL],
				bottomRight: radius[RADIUS.NONE],
				topLeft: radius[RADIUS.XX_SMALL],
				topRight: radius[RADIUS.NONE]
			},
			[SHAPE.END]: {
				bottomLeft: radius[RADIUS.NONE],
				bottomRight: radius[RADIUS.XX_SMALL],
				topLeft: radius[RADIUS.NONE],
				topRight: radius[RADIUS.XX_SMALL]
			}
		}
	}
}
