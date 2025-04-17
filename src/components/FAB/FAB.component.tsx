import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FABBase} from './FAB-base.component'
import type {FABProps, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconLayout, LabelText, Main} from './FAB.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const renderFAB = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	density,
	disabled,
	elevation,
	eventName,
	extendedFAB,
	icon,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	ref,
	size,
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
			testID={`fab__animatedBackgroundUnderlay--${testID}`}
		/>
	)

	const elevationUnderlayElement = (
		<Elevation
			level={elevation}
			shape={shape}
			testID={testID}
		/>
	)

	return (
		<Container
			accessibilityLabel={labelText ?? accessibilityLabel}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			density={density}
			extendedFAB={extendedFAB}
			size={size}
			testID={`fab--${testID}`}
		>
			<Touchable
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				elevationUnderlay={elevationUnderlayElement}
				mainAlignSelf={size === SIZE.SMALL ? 'center' : 'stretch'}
				ref={ref}
				shape={shape}
				testID={testID}
				underlayColor={underlayColor}
			>
				<Content
					{...contentProps}
					density={density}
					extendedFAB={extendedFAB}
					pointerEvents='none'
					size={size}
					testID={`fab__content--${testID}`}
					type={type}
				>
					<Main
						extendedFAB={extendedFAB}
						size={size}
						testID={`fab__main--${testID}`}
						type={type}
					>
						{icon && (
							<IconLayout testID={`fab__iconLayout--${testID}`}>
								{icon}
							</IconLayout>
						)}

						{extendedFAB && labelText && (
							<AnimatedLabelText
								size={SIZE.LARGE}
								style={[labelTextAnimatedStyle]}
								testID={`fab__animatedLabelText--${testID}`}
								type={TYPOGRAPHY.LABEL}
							>
								{labelText}
							</AnimatedLabelText>
						)}
					</Main>

					<Underlay
						eventName={eventName}
						shape={shape}
						testID={testID}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}

const FABWithRef = forwardRef<View, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
		renderFAB={renderFAB}
	/>
))

const FAB: FC<FABProps> = FABWithRef

export const Fab = FAB
