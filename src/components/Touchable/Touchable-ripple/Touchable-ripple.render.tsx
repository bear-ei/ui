import {forwardRef, useMemo} from 'react'
import {View, type ViewStyle} from 'react-native'
import {classesName, RADIUS, SHAPE, shapeClasses} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedView} from '../../Animated'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

export const RenderTouchableRipple = forwardRef<View, RenderTouchableRippleProps>(
	(
		{
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
		},
		ref
	) => {
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
				onLayout={onLayout}
				className={classesName(
					'pointer-events-none absolute bg-[--color-on-surface]',
					shapeClasses(RADIUS.FULL)(SHAPE.ALL)
				)}
				ref={ref}
				style={animatedViewStyle}
				testID={testID ?? `touchableRipple--${id}`}
			/>
		)
	}
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
