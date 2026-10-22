import {type FC} from 'react'
import {Pressable, View} from 'react-native'

import type {RenderTouchableProps, RenderTouchableRippleProps} from './Touchable.interface'

import {useTheme} from '../../hooks'
import {SHAPE} from '../../theme'
import {TouchableRipple} from './Touchable-ripple'

export const RenderTouchableRipples: FC<RenderTouchableRippleProps> = ({
	centered,
	containerLayout,
	id,
	rippleSequence,
	...props
}) => (
	<>
		{Object.entries(rippleSequence).map(([indexKey, touchableLocation]) => {
			const isCenteredTouchableRipple = typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

			return (
				<TouchableRipple
					{...props}
					centered={isCenteredTouchableRipple}
					containerLayout={containerLayout}
					indexKey={indexKey}
					key={indexKey}
					testID={`touchable__touchableRipple--${id}`}
					touchableLocation={touchableLocation}
				/>
			)
		})}
	</>
)

export const RenderTouchable: FC<RenderTouchableProps> = ({
	backgroundUnderlay,
	children,
	elevationUnderlay,
	id,
	interactionHandlers,
	radius,
	rippleElements,
	shape = SHAPE.ALL,
	testID,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classesName, shapeClasses} = token.classes

	// interactionHandlers wraps the raw callbacks (onPress, onPressIn, …)
	// that TouchableBase passed through touchableProps. They MUST come last
	// so the wrapped versions take precedence — otherwise the state machine
	// gets bypassed and focus / ripple / disabled behavior breaks.
	return (
		<Pressable
			{...touchableProps}
			{...interactionHandlers}
			className='flex flex-1 flex-col items-center justify-center self-stretch outline-none'
			testID={testID ?? `touchable--${id}`}
		>
			<View
				className={classesName('relative z-30 flex-1 self-stretch', shapeClasses(shape, radius))}
				testID={`touchable__main--${id}`}
			>
				{children}
				<View
					className={classesName(
						'absolute bottom-0 left-0 right-0 top-0 overflow-hidden',
						shapeClasses(shape, radius)
					)}
					testID={`touchable__rippleLayout--${id}`}
				>
					{rippleElements}
				</View>

				{backgroundUnderlay}
				{elevationUnderlay}
			</View>
		</Pressable>
	)
}

RenderTouchable.displayName = 'RenderTouchable'
