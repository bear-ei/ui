import {useMemo, type FC} from 'react'

import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'

import {useTheme} from '../../hooks'
import {AnimatedView} from '../Animated'

export const RenderLayoutAnimated: FC<RenderLayoutAnimatedProps> = ({
	children,
	className,
	containerAnimatedStyle,
	id,
	interactionHandlers,
	style,
	testID,
	visible,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {onLayout} = interactionHandlers
	const animatedViewStyle = useMemo(
		() => [style, ...(Array.isArray(containerAnimatedStyle) ? containerAnimatedStyle : [containerAnimatedStyle])],
		[style, containerAnimatedStyle]
	)

	return (
		<AnimatedView
			{...containerProps}
			className={classesName('flex flex-col', {['pointer-events-none -z-40']: !visible}, className)}
			onLayout={onLayout}
			style={animatedViewStyle}
			testID={testID ?? `layoutAnimated--${id}`}
		>
			{children}
		</AnimatedView>
	)
}
