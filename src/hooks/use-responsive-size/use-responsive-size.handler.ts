import {WINDOW_SIZE, type WindowSize} from '../../theme'

export const resolveWindowSize = (width: number): WindowSize =>
	width >= 1600 ? WINDOW_SIZE.X_LARGE
	: width >= 1200 ? WINDOW_SIZE.LARGE
	: width >= 840 ? WINDOW_SIZE.EXPANDED
	: width >= 600 ? WINDOW_SIZE.MEDIUM
	: WINDOW_SIZE.COMPACT
