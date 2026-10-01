export interface Shadow {
	elevation: number
	shadowOffset: {height: number; width: number}
	shadowOpacity: number
	shadowRadius: number
}

export interface Elevation {
	shadowColor: string

	/**
	 * level0
	 *      - Assist Chip (Flat)
	 *      - Carousel Item
	 *      - Filled Button
	 *      - Filled Card
	 *      - Filter Chip (Flat)
	 *      - Full Screen Dialog
	 *      - List Item
	 *      - List Input Chip
	 *      - List Navigation Rail
	 *      - Primary Navigation Tabs
	 *      - Secondary Navigation Tabs
	 *      - Outlined Card
	 *      - Side Sheet (Docked)
	 *      - Slider (Track)
	 *      - Suggestion Chip (Flat)
	 *      - Top App Bar
	 */
	level0: Shadow

	/**
	 * level1
	 *      - Assist Chip (Elevated)
	 *      - Banner
	 *      - Bottom Sheet (Modal)
	 *      - Elevated Button
	 *      - Elevated Card
	 *      - Extended FAB (Lowered)
	 *      - FAB (Lowered)
	 *      - Filter Chip (Elevated)
	 *      - Navigation Drawer (Modal)
	 *      - Side Sheet (Modal)
	 *      - Slider (Handle)
	 *      - Suggestion Chip (Elevated)
	 */
	level1: Shadow

	/**
	 * level2
	 *      - Autocomplete Menu
	 *      - Bottom App Bar
	 *      - Dropdown Menu
	 *      - Menu
	 *      - Navigation Bar
	 *      - Select Menu
	 *      - Rich Tooltip
	 *      - Top App Bar (Scrolled)
	 */
	level2: Shadow

	/**
	 * level3
	 *      - FAB
	 *      - Extended FAB
	 *      - Modal Date Picker
	 *      - Docked Date Picker
	 *      - Modal Date Input
	 *      - Dialog
	 *      - Search Bar
	 *      - Search View
	 *      - Time Picker
	 *      - Time Input
	 */
	level3: Shadow

	/**
	 * level4
	 *      - not assigned as resting level
	 */
	level4: Shadow

	/**
	 * level5
	 *      - not assigned as resting level
	 */
	level5: Shadow
}
