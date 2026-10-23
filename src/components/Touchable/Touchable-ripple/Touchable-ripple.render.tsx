import {useMemo, type FC} from 'react'
import {type ViewStyle} from 'react-native'

import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

import {classesName, RADIUS, SHAPE, shapeClasses} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedView} from '../../Animated'

export const RenderTouchableRipple: FC<RenderTouchableRippleProps> = ({
	containerAnimatedStyle,
	id,
	interactionHandlers,
	locationX = 0,
	locationY = 0,
	size = 0,
	style,
	testID,
	underlayColor,
	...containerProps
}) => {
	const {onLayout} = interactionHandlers
	const animatedViewStyle = useMemo(
		() => [
			style,
			{
				...(underlayColor && {backgroundColor: underlayColor}),
				height: platformValue(size),
				left: platformValue(locationX),
				top: platformValue(locationY),
				width: platformValue(size)
			} as ViewStyle,
			containerAnimatedStyle
		],
		[style, size, locationX, locationY, underlayColor, containerAnimatedStyle]
	)

	return (
		<AnimatedView
			{...containerProps}
			className={classesName(
				'pointer-events-none absolute bg-[--color-on-surface]',
				shapeClasses(SHAPE.ALL, RADIUS.FULL)
			)}
			onLayout={onLayout}
			style={animatedViewStyle}
			testID={testID ?? `touchableRipple--${id}`}
		/>
	)
}
