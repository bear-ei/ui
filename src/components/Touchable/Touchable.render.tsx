import {forwardRef, type FC} from 'react'
import {TouchableRipple} from './Touchable-ripple'
import type {PressableType, RenderTouchableProps, RenderTouchableRippleProps} from './Touchable.interface'
import {Container, Main, RippleLayout, Touchable} from './Touchable.styles'

export const RenderTouchableRipples: FC<RenderTouchableRippleProps> = ({
	centered,
	containerLayout,
	id,
	rippleSequence,
	...props
}) => (
	<>
		{Object.entries(rippleSequence).map(([indexKey, touchableLocation]) => {
			const isCenteredTouchableRipple =
				typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

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

export const RenderTouchable = forwardRef<PressableType, RenderTouchableProps>(
	(
		{
			backgroundUnderlay,
			children,
			contentStyle,
			elevationUnderlay,
			id,
			interactionHandlers,
			rippleElements,
			shape,
			testID,
			...touchableProps
		}: RenderTouchableProps,
		ref
	) => (
		<Container testID={testID ?? `touchable--${id}`}>
			<Touchable
				{...touchableProps}
				{...interactionHandlers}
				ref={ref}
				testID={`touchable__touchableContent--${id}`}
			>
				<Main
					shape={shape}
					testID={`touchable__main--${id}`}
					style={[contentStyle]}
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
			</Touchable>
		</Container>
	)
)
