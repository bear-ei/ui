import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Touchable} from '../../Touchable'
import {Underlay} from '../../Underlay'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import type {ListAffordanceButtonProps, RenderListAffordanceButtonProps} from './List-affordance-button.interface'
import {BackgroundUnderlay, Container, Content, LabelText} from './List-affordance-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const renderListAffordanceButton = ({
	backgroundUnderlayAnimatedStyle,
	disabled,
	eventName,
	icon,
	id,
	labelText,
	labelTextAnimatedStyle,
	interactionHandlers,
	testID,
	theme
}: RenderListAffordanceButtonProps) => {
	const underlayColor = theme.token.scheme.onPrimary
	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
			style={[backgroundUnderlayAnimatedStyle]}
			testID={`listAffordanceButton__animatedBackgroundUnderlay--${id}`}
		/>
	)

	return (
		<Container testID={testID ?? `listAffordanceButton--${id}`}>
			<Touchable
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				testID={`listAffordanceButton__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<Content
					accessibilityLabel={labelText}
					accessibilityRole='button'
					pointerEvents='none'
					testID={`listAffordanceButton__content--${id}`}
				>
					{icon ?? (
						<AnimatedLabelText
							ellipsizeMode='tail'
							numberOfLines={1}
							size={SIZE.LARGE}
							style={[labelTextAnimatedStyle]}
							testID={`listAffordanceButton__animatedLabelText--${id}`}
							type={TYPOGRAPHY.LABEL}
						>
							{labelText}
						</AnimatedLabelText>
					)}

					<Underlay
						eventName={eventName}
						testID={`listAffordanceButton__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}

const ListAffordanceButtonWithRef = forwardRef<View, ListAffordanceButtonProps>((props, ref) => (
	<ListAffordanceButtonBase
		{...props}
		ref={ref}
		renderListAffordanceButton={renderListAffordanceButton}
	/>
))

export const ListAffordanceButton = ListAffordanceButtonWithRef
