import {SIZE} from '../theme.enum'
import type {Border} from './border.interface'

export const createBorder = (): Border => ({
	[SIZE.MEDIUM]: 2,
	[SIZE.NONE]: 0,
	[SIZE.SMALL]: 1
})
