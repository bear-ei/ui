import {SIZE} from '../theme.enum'
import type {Border} from './border.interface'

export const createBorder = (): Border => ({
	[SIZE.EXTRA_LARGE]: 4,
	[SIZE.EXTRA_SMALL]: 0.5,
	[SIZE.LARGE]: 3,
	[SIZE.MEDIUM]: 2,
	[SIZE.NONE]: 0,
	[SIZE.SMALL]: 1
})
