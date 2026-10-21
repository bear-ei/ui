import {useWindowDimensions} from '../use-window-dimensions'

import {resolveWindowSize} from './use-responsive-size.handler'

export const useResponsiveSize = () => {
	const {width, ...scaledSize} = useWindowDimensions()

	return {width, windowSize: resolveWindowSize(width), ...scaledSize}
}
