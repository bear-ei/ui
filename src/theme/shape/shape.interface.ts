import type {SHAPE} from './shape.enum'

export type ShapeType = (typeof SHAPE)[keyof typeof SHAPE]
export interface BorderRadius {
	bottomLeft: number
	bottomRight: number
	topLeft: number
	topRight: number
}

export interface Shape {
	[SHAPE.TINY_SMALL_BOTTOM]: BorderRadius
	[SHAPE.TINY_SMALL_END]: BorderRadius
	[SHAPE.TINY_SMALL_START]: BorderRadius
	[SHAPE.TINY_SMALL_TOP]: BorderRadius
	[SHAPE.TINY_SMALL]: BorderRadius

	/**
	 *  Extra small
	 *      - Autocomplete menu
	 *      - Select menu
	 *      - Snackbars
	 *      - Standard menu
	 *      - Text fields
	 */

	[SHAPE.EXTRA_SMALL_BOTTOM]: BorderRadius
	[SHAPE.EXTRA_SMALL_END]: BorderRadius
	[SHAPE.EXTRA_SMALL_START]: BorderRadius
	[SHAPE.EXTRA_SMALL_TOP]: BorderRadius
	[SHAPE.EXTRA_SMALL]: BorderRadius

	/**
	 *  Small
	 *      - Chips
	 *      - Rich tooltip
	 */
	[SHAPE.SMALL_BOTTOM]: BorderRadius
	[SHAPE.SMALL_END]: BorderRadius
	[SHAPE.SMALL_START]: BorderRadius
	[SHAPE.SMALL_TOP]: BorderRadius
	[SHAPE.SMALL]: BorderRadius

	/**
	 *  Medium
	 *      - Cards
	 *      - Small FABs
	 */
	[SHAPE.MEDIUM_BOTTOM]: BorderRadius
	[SHAPE.MEDIUM_END]: BorderRadius
	[SHAPE.MEDIUM_START]: BorderRadius
	[SHAPE.MEDIUM_TOP]: BorderRadius
	[SHAPE.MEDIUM]: BorderRadius

	/**
	 *  Large
	 *      - Extended FABs
	 *      - FABs
	 *      - Navigation drawers
	 */
	[SHAPE.LARGE_BOTTOM]: BorderRadius
	[SHAPE.LARGE_END]: BorderRadius
	[SHAPE.LARGE_START]: BorderRadius
	[SHAPE.LARGE_TOP]: BorderRadius
	[SHAPE.LARGE]: BorderRadius

	/**
	 *  Extra large
	 *      - Bottom sheets (docked)
	 *      - Dialogs
	 *      - Floating sheets
	 *      - Large FABs
	 *      - Search view (docked)
	 *      - Time picker
	 *      - Time input
	 */
	[SHAPE.EXTRA_LARGE_BOTTOM]: BorderRadius
	[SHAPE.EXTRA_LARGE_END]: BorderRadius
	[SHAPE.EXTRA_LARGE_START]: BorderRadius
	[SHAPE.EXTRA_LARGE_TOP]: BorderRadius
	[SHAPE.EXTRA_LARGE]: BorderRadius

	/**
	 *  Full
	 *      - Badge
	 *      - Buttons
	 *      - Icon buttons
	 *      - Sliders
	 *      - Switches
	 *      - Search bar
	 */
	[SHAPE.FULL_BOTTOM]: BorderRadius
	[SHAPE.FULL_END]: BorderRadius
	[SHAPE.FULL_START]: BorderRadius
	[SHAPE.FULL_TOP]: BorderRadius
	[SHAPE.FULL]: BorderRadius

	/**
	 *  None
	 *      - Banners
	 *      - Bottom app bars
	 *      - Full-screen dialogs
	 *      - Lists
	 *      - Navigation bars
	 *      - Navigation rails
	 *      - Progress indicators
	 *      - Search view (full-screen)
	 *      - Side sheets (docked)
	 *      - Tabs
	 *      - Top app bars
	 */
	[SHAPE.NONE]: BorderRadius
}
