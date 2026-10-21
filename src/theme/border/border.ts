import type {Border} from './border.interface'

import {BORDER_SIZE} from './border.enum'

const BORDER = {
	[BORDER_SIZE.LARGE]: 3,
	[BORDER_SIZE.MEDIUM]: 2,
	[BORDER_SIZE.NONE]: 0,
	[BORDER_SIZE.SMALL]: 1,
	[BORDER_SIZE.X_LARGE]: 4,
	[BORDER_SIZE.X_SMALL]: 0.5
}

export const createBorder = (): Border => BORDER
