import {WINDOW_SIZE, type WindowSize} from '@bearei/material-token'
import {useWindowDimensions} from './use-window-dimensions.hook'

export const useWindowSize = () => {
	const {width, ...scaledSize} = useWindowDimensions({changeEventThrottle: 150})

	let windowSize!: WindowSize

	switch (true) {
		case width >= 0 && width < 600:
			windowSize = WINDOW_SIZE.COMPACT
			break
		case width >= 600 && width < 840:
			windowSize = WINDOW_SIZE.MEDIUM
			break
		case width >= 840 && width < 1200:
			windowSize = WINDOW_SIZE.EXPANDED
			break
		case width >= 1200 && width < 1600:
			windowSize = WINDOW_SIZE.LARGE
			break
		case width >= 1600:
			windowSize = WINDOW_SIZE.EXTRA_LARGE
			break

		default:
			windowSize = WINDOW_SIZE.MEDIUM
	}

	return {windowSize, width, ...scaledSize}
}
