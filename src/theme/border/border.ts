import {BORDER_SIZE} from './border.enum'
import type {Border} from './border.interface'

export const createBorder = (): Border => ({
	[BORDER_SIZE.X_LARGE]: 4,
	[BORDER_SIZE.X_SMALL]: 0.5,
	[BORDER_SIZE.LARGE]: 3,
	[BORDER_SIZE.MEDIUM]: 2,
	[BORDER_SIZE.NONE]: 0,
	[BORDER_SIZE.SMALL]: 1
})
