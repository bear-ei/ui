import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {cloneElement, forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import type {AnimatedProps} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import type {FastOmit} from 'styled-components'
import {Underlay} from '../Underlay'
import {TextInputBase} from './Text-input-base.component'
import type {InputProps, RenderTextInputProps, TextInputProps} from './Text-input.interface'
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

const render = ({
	activeIndicatorAnimatedStyle,
	content,
	contentSize,
	density,
	error,
	eventName,
	headerAnimatedStyle,
	id,
	inputAnimatedStyle,
	labelAnimatedStyle,
	labelText,
	labelTextAnimatedStyle,
	leading,
	multiline,
	onHeaderFocus,
	onSupportingTextVisible,
	interactionHandlers,
	supportingText,
	supportingTextAnimatedStyle,
	supportingTextVisible,
	testID,
	theme,
	trailing,
	...inputProps
}: RenderTextInputProps) => {
	const shape = SHAPE.EXTRA_SMALL_TOP
	const leadingShow = !!leading
	const underlayColor = theme.token.scheme.onSurface
	const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]
	const {onFocus, onBlur, ...onTouchableHeaderEvent} = interactionHandlers

	return (
		<Container
			{...(error && {
				accessibilityLabel: supportingText,
				accessibilityRole: 'alert'
			})}
			testID={testID ?? `textInput--${id}`}
		>
			<Content testID={`textInput__content--${id}`}>
				<TouchableHeader
					{...onTouchableHeaderEvent}
					{...(!error && {
						accessibilityLabel: labelText,
						accessibilityRole: 'keyboardkey'
					})}
					enableFocusRing={false}
					onFocus={onHeaderFocus}
					testID={`textInput__touchableHeader--${id}`}
				>
					<AnimatedHeader
						density={density}
						leadingShow={leadingShow}
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
								{cloneElement(trailing, {
									disabledFocus: true,
									testID: `textInput__trailing--${id}`
								})}
							</Trailing>
						)}

						<AnimatedLabel
							density={density}
							leadingShow={leadingShow}
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

const ForwardRefTextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => (
	<TextInputBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const TextInput: FC<TextInputProps> = ForwardRefTextInput
