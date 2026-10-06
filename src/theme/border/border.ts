import {BORDER} from './border.enum'
import type {Border} from './border.interface'

export const createBorder = (): Border => ({
	[BORDER.X_LARGE]: 4,
	[BORDER.X_SMALL]: 0.5,
	[BORDER.LARGE]: 3,
	[BORDER.MEDIUM]: 2,
	[BORDER.NONE]: 0,
	[BORDER.SMALL]: 1
})
