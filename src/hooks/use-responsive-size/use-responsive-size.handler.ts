import {BREAKPOINT, type Breakpoint} from '../../theme'

export const resolveBreakpoint = (width: number): Breakpoint =>
	width >= 1600 ? BREAKPOINT.X_LARGE
	: width >= 1200 ? BREAKPOINT.LARGE
	: width >= 840 ? BREAKPOINT.EXPANDED
	: width >= 600 ? BREAKPOINT.MEDIUM
	: BREAKPOINT.COMPACT
