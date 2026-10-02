import {forwardRef} from 'react'
import type {View} from 'react-native'
import {AnimatedView} from '../Animated-component'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'
import {useTheme} from '../../hooks'

export const RenderLayoutAnimated = forwardRef<View, RenderLayoutAnimatedProps>(
	(
		{
			children,
			className,
			containerAnimatedStyle,
			id,
			interactionHandlers,
			style,
			testID,
			visible,
			...containerProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const {onLayout} = interactionHandlers

		return (
			<AnimatedView
				{...containerProps}
				className={classesName('flex flex-col', {['pointer-events-none -z-40']: !visible}, className)}
				onLayout={onLayout}
				ref={ref}
				style={[
					style,
					...(Array.isArray(containerAnimatedStyle) ? containerAnimatedStyle : [containerAnimatedStyle])
				]}
				testID={testID ?? `layoutAnimated--${id}`}
			>
				{children}
			</AnimatedView>
		)
	}
)

RenderLayoutAnimated.displayName = 'RenderLayoutAnimated'
