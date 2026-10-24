import {type FC} from 'react'
import {type ViewStyle} from 'react-native'

import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

import {useTheme} from '../../../hooks'
import {classNames, RADIUS, SHAPE} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
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
	const {token} = useTheme()
	const {shapeClasses} = token.classes
	const {onLayout} = interactionHandlers
	const animatedViewStyle = [
		style,
		{
			...(underlayColor && {backgroundColor: underlayColor}),
			height: toPlatformUnit(size),
			left: toPlatformUnit(locationX),
			top: toPlatformUnit(locationY),
			width: toPlatformUnit(size)
		} as ViewStyle,
		containerAnimatedStyle
	]

	return (
		<AnimatedView
			{...containerProps}
			className={classNames(
				'pointer-events-none absolute bg-[--color-on-surface]',
				shapeClasses(SHAPE.ALL)(RADIUS.FULL)
			)}
			onLayout={onLayout}
			style={animatedViewStyle}
			testID={testID ?? `touchableRipple--${id}`}
		/>
	)
}
