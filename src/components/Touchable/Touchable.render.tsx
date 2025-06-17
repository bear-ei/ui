import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {TouchableRipple} from './Touchable-ripple'
import type {RenderTouchableProps, RenderTouchableRippleOptions, TouchableRippleSequence} from './Touchable.interface'
import {Container, Main, RippleLayout, TouchableContent} from './Touchable.styles'

export const renderTouchableRipple =
	({centered, containerLayout, id, ...props}: RenderTouchableRippleOptions) =>
	(rippleSequence: TouchableRippleSequence) =>
		Object.entries(rippleSequence).map(([indexKey, touchableLocation]) => {
			const isEnteredTouchableRipple =
				typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

			return (
				<TouchableRipple
					{...props}
					centered={isEnteredTouchableRipple}
					containerLayout={containerLayout}
					indexKey={indexKey}
					key={indexKey}
					testID={`touchable__touchableRipple--${id}`}
					touchableLocation={touchableLocation}
				/>
			)
		})

export const RenderTouchable = forwardRef<typeof Pressable, RenderTouchableProps>(
	(
		{
			backgroundUnderlay,
			children,
			elevationUnderlay,
			id,
			interactionHandlers,
			mainAlignSelf,
			rippleElements,
			shape,
			testID,
			...contentProps
		}: RenderTouchableProps,
		ref
	) => (
		<Container testID={testID ?? `touchable--${id}`}>
			<TouchableContent
				{...contentProps}
				{...interactionHandlers}
				enableFocusRing={false}
				ref={ref}
				testID={`touchable__touchableContent--${id}`}
			>
				<Main
					alignSelf={mainAlignSelf}
					shape={shape}
					testID={`touchable__main--${id}`}
				>
					{children}
					<RippleLayout
						shape={shape}
						testID={`touchable__rippleLayout--${id}`}
					>
						{rippleElements}
					</RippleLayout>

					{backgroundUnderlay}
					{elevationUnderlay}
				</Main>
			</TouchableContent>
		</Container>
	)
)
