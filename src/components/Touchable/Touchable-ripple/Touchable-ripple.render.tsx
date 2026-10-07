import {forwardRef} from 'react'
import {View, type ViewStyle} from 'react-native'
import {platformValue} from '../../../utils'
import {AnimatedView} from '../../Animated-component'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'
import {classesName, RADIUS, SHAPE, shapeClasses} from '../../../theme'

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
		const touchableRippleStyle = {
			...(underlayColor && {backgroundColor: underlayColor}),
			height: platformValue(size),
			left: platformValue(locationX),
			top: platformValue(locationY),
			width: platformValue(size)
		} as ViewStyle

		return (
			<AnimatedView
				{...containerProps}
				onLayout={onLayout}
				className={classesName(
					'pointer-events-none absolute bg-[--color-on-surface]',
					shapeClasses(RADIUS.FULL)(SHAPE.ALL)
				)}
				ref={ref}
				style={[style, touchableRippleStyle, containerAnimatedStyle]}
				testID={testID ?? `touchableRipple--${id}`}
			/>
		)
	}
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
