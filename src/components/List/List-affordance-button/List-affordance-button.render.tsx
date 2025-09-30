import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {forwardRef, useMemo} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Touchable, type PressableType} from '../../Touchable'
import {Underlay} from '../../Underlay'
import type {RenderListAffordanceButtonProps} from './List-affordance-button.interface'
import {BackgroundUnderlay, Container, Content, LabelText} from './List-affordance-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
export const RenderListAffordanceButton = forwardRef<PressableType, RenderListAffordanceButtonProps>(
	(
		{
			accessibilityLabel,
			backgroundUnderlayAnimatedStyle,
			disabled,
			eventName,
			icon,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			testID,
			...touchableProps
		},
		ref
	) => {
		const theme = useTheme()
		const touchableContentStyle = useMemo(() => ({flex: 1}) as StyleProp<ViewStyle>, [])
		const underlayColor = theme.token.scheme.onPrimary
		const backgroundUnderlayElement = (
			<AnimatedBackgroundUnderlay
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`listAffordanceButton__backgroundUnderlay--${id}`}
			/>
		)

		return (
			<Container
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='button'
				tabIndex={-1}
				testID={testID ?? `listAffordanceButton--${id}`}
			>
				<Touchable
					{...touchableProps}
					{...interactionHandlers}
					backgroundUnderlay={backgroundUnderlayElement}
					contentStyle={touchableContentStyle}
					disabled={disabled}
					ref={ref}
					testID={`listAffordanceButton__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<Content testID={`listAffordanceButton__content--${id}`}>
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
)
