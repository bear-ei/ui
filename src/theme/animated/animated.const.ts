import {DURATION, EASING, LOOP} from './animated.enum'

/**
 * Shared timing recipes for `animatedTiming`.
 *
 * Named by intent instead of raw values, so call sites read as
 * "what is animating" rather than repeating duration/easing pairs.
 */
export const ANIMATED_TIMING = {
	/** Visibility entry (decelerate). */
	ENTER: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
	/** Visibility exit (accelerate). */
	EXIT: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE},
	/** One-shot fade-out with a longer tail (ripple release, scrim out). */
	FADE_OUT: {duration: DURATION.SHORT_3, easing: EASING.STANDARD_ACCELERATE},
	/** Hover feedback. */
	HOVER: {duration: DURATION.SHORT_1, easing: EASING.STANDARD},
	/** Indeterminate loop (skeleton, circular progress). */
	LOOP: {duration: LOOP.LOOP_2, easing: EASING.LINEAR, repeat: -1},
	/** Determinate progress. */
	PROGRESS: {duration: DURATION.MEDIUM_1, easing: EASING.STANDARD_DECELERATE},
	/** Default state transition — colors, sizes, translations. */
	STANDARD: {duration: DURATION.SHORT_2, easing: EASING.STANDARD},
	/** Surface slide (sheet content). */
	SURFACE: {duration: DURATION.MEDIUM_0, easing: EASING.STANDARD}
} as const

/**
 * Shared enter/exit timings for `LayoutAnimated`.
 *
 * - `SHORT`: standard component show/hide.
 * - `EMPHASIZED`: large layout surfaces.
 * - `MASK`: scrim overlay (quicker in, standard out).
 */
export const ENTRY_EXIT = {
	EMPHASIZED: {
		entry: {duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE},
		exit: {duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}
	},
	MASK: {
		entry: {duration: DURATION.MEDIUM_0, easing: EASING.STANDARD_DECELERATE},
		exit: ANIMATED_TIMING.FADE_OUT
	},
	SHORT: {
		entry: ANIMATED_TIMING.ENTER,
		exit: ANIMATED_TIMING.EXIT
	}
} as const
