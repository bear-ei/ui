import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement} from 'react'
import type {AnimatedProps} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import type {FastOmit} from 'styled-components'
import {Underlay} from '../Underlay'
import type {InputProps, RenderTextInputProps} from './Text-input.interface'
import {
	ActiveIndicator,
	Container,
	Content,
	Control,
	Header,
	Input,
	Label,
	LabelText,
	Leading,
	Main,
	SupportingLayoutAnimated,
	SupportingText,
	TouchableHeader,
	Trailing
} from './Text-input.styles'

/**
 * FIXME: Multiline text [macos]
 */
const AnimatedActiveIndicator = Animated.createAnimatedComponent(ActiveIndicator)
const AnimatedHeader = Animated.createAnimatedComponent(Header)
const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedSupportingText = Animated.createAnimatedComponent(SupportingText)
const AnimatedTextInput = Animated.createAnimatedComponent(Input) as React.FunctionComponent<
	AnimatedProps<FastOmit<InputProps, never>>
>

export const renderTextInput = ({
	accessibilityLabel,
	activeIndicatorAnimatedStyle,
	content,
	contentSize,
	density,
	error,
	eventName,
	headerAnimatedStyle,
	id,
	inputAnimatedStyle,
	interactionHandlers,
	labelAnimatedStyle,
	labelText,
	labelTextAnimatedStyle,
	leading,
	multiline,
	onHeaderFocus,
	onSupportingTextVisible,
	supportingText,
	supportingTextAnimatedStyle,
	supportingTextVisible,
	testID,
	theme,
	trailing,
	...inputProps
}: RenderTextInputProps) => {
	const {onFocus, onBlur, ...onTouchableHeaderEvent} = interactionHandlers
	const isLeadingShow = !!leading
	const shape = SHAPE.EXTRA_SMALL_TOP
	const underlayColor = theme.token.scheme.onSurface
	const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]

	return (
		<Container
			{...(error && {
				accessibilityLabel: accessibilityLabel ?? supportingText,
				accessibilityRole: 'alert'
			})}
			testID={testID ?? `textInput--${id}`}
		>
			<Content testID={`textInput__content--${id}`}>
				<TouchableHeader
					{...onTouchableHeaderEvent}
					{...(!error && {
						accessibilityLabel: accessibilityLabel ?? labelText,
						accessibilityRole: 'keyboardkey'
					})}
					enableFocusRing={false}
					onFocus={onHeaderFocus}
					testID={`textInput__touchableHeader--${id}`}
				>
					<AnimatedHeader
						density={density}
						leadingShow={isLeadingShow}
						shape={shape}
						style={[headerAnimatedStyle]}
						testID={`textInput__animatedHeader--${id}`}
						trailingShow={!!trailing}
					>
						{leading && (
							<Leading testID={`textInput__leading--${id}`}>
								{cloneElement(leading, {disabledFocus: true})}
							</Leading>
						)}

						<Main
							contentShow={!!content}
							density={density}
							testID={`textInput__main--${id}`}
						>
							{content}
							<Control
								multiline={multiline}
								size={contentSize?.height}
								testID={`textInput__control--${id}`}
							>
								<AnimatedTextInput
									{...inputProps}
									/**
									 * enableFocusRing is used to disable the focus style in macOS,
									 * this parameter has been implemented and is available.
									 * However, react-native-macos does not have an official typescript declaration for this parameter,
									 * so using it directly in a typescript will result in an undefined parameter.
									 */
									enableFocusRing={false}
									multiline={multiline}
									onBlur={onBlur}
									onFocus={onFocus}
									style={[inputAnimatedStyle]}
									testID={`textInput__animatedTextInput--${id}`}
								/>
							</Control>
						</Main>

						{trailing && (
							<Trailing testID={`textInput__trailing--${id}`}>
								{cloneElement(trailing, {disabledFocus: true})}
							</Trailing>
						)}

						<AnimatedLabel
							density={density}
							leadingShow={isLeadingShow}
							style={[labelAnimatedStyle]}
							testID={`textInput__animatedLabel--${id}`}
						>
							<AnimatedLabelText
								size={SIZE.LARGE}
								style={[labelTextAnimatedStyle]}
								testID={`textInput__animatedLabelText--${id}`}
								type={TYPOGRAPHY.BODY}
							>
								{labelText}
							</AnimatedLabelText>
						</AnimatedLabel>

						<AnimatedActiveIndicator
							style={[activeIndicatorAnimatedStyle]}
							testID={`textInput__animatedActiveIndicator--${id}`}
						/>

						<Underlay
							eventName={eventName}
							opacities={underlayOpacities}
							testID={`textInput__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</AnimatedHeader>
				</TouchableHeader>

				<SupportingLayoutAnimated
					onVisible={onSupportingTextVisible}
					testID={`textInput__supportingLayoutAnimated--${id}`}
					visible={supportingTextVisible}
				>
					<AnimatedSupportingText
						size={SIZE.SMALL}
						style={[supportingTextAnimatedStyle]}
						testID={`textInput__animatedSupportingText--${id}`}
						type={TYPOGRAPHY.BODY}
					>
						{supportingText}
					</AnimatedSupportingText>
				</SupportingLayoutAnimated>
			</Content>
		</Container>
	)
}
