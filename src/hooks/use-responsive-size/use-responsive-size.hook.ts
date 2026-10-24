import {useWindowDimensions} from '../use-window-dimensions'
import {resolveBreakpoint} from './use-responsive-size.handler'

export const useResponsiveSize = () => {
	const {width, ...scaledSize} = useWindowDimensions()

	return {breakpoint: resolveBreakpoint(width), width, ...scaledSize}
}
