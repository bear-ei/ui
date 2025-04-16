import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FABBase} from './FAB-base.component'
import type {FABProps, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconLayout, LabelText, Main} from './FAB.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	density,
	disabled,
	elevation,
	eventName,
	extendedFAB,
	icon,
	id,
	labelText,
	labelTextAnimatedStyle,
	ref,
	size,
	interactionHandlers,
	testID,
	type,
	underlayColor,
	...contentProps
}: RenderFABProps) => {
	const sizeShape = size === SIZE.MEDIUM ? SHAPE.LARGE : SHAPE.MEDIUM
	const shape = size === SIZE.LARGE ? SHAPE.EXTRA_LARGE : sizeShape
	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
			shape={shape}
			style={[backgroundUnderlayAnimatedStyle]}
			testID={`fab__animatedBackgroundUnderlay--${id}`}
		/>
	)

	const elevationUnderlayElement = (
		<Elevation
			level={elevation}
			shape={shape}
			testID={`fab__elevation--${id}`}
		/>
	)

	return (
		<Container
			density={density}
			extendedFAB={extendedFAB}
			size={size}
			testID={testID ?? `fab--${id}`}
		>
			<Touchable
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				elevationUnderlay={elevationUnderlayElement}
				mainAlignSelf={size === SIZE.SMALL ? 'center' : 'stretch'}
				ref={ref}
				shape={shape}
				testID={`fab__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<Content
					{...contentProps}
					accessibilityLabel={labelText ?? accessibilityLabel}
					accessibilityRole='button'
					density={density}
					extendedFAB={extendedFAB}
					pointerEvents='none'
					size={size}
					testID={`fab__content--${id}`}
					type={type}
				>
					<Main
						extendedFAB={extendedFAB}
						size={size}
						testID={`fab__main--${id}`}
						type={type}
					>
						{icon && (
							<IconLayout testID={`fab__iconLayout--${id}`}>
								{icon}
							</IconLayout>
						)}

						{extendedFAB && labelText && (
							<AnimatedLabelText
								size={SIZE.LARGE}
								style={[labelTextAnimatedStyle]}
								testID={`fab__animatedLabelText--${id}`}
								type={TYPOGRAPHY.LABEL}
							>
								{labelText}
							</AnimatedLabelText>
						)}
					</Main>

					<Underlay
						eventName={eventName}
						shape={shape}
						testID={`fab__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}

const ForwardRefFAB = forwardRef<View, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
		render={render}
	/>
))

const FAB: FC<FABProps> = ForwardRefFAB

export const Fab = FAB
