import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef, useMemo} from 'react'
import type {TextInput} from 'react-native'
import type {AnimatedProps} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import type {FastOmit} from 'styled-components'
import {useTheme} from 'styled-components/native'
import {Underlay} from '../Underlay'
import type {RenderTextInputProps, TextInputProps} from './Text-input.interface'
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
	SupportingLayout,
	SupportingText,
	TouchableHeader,
	Trailing
} from './Text-input.styles'

const AnimatedActiveIndicator = Animated.createAnimatedComponent(ActiveIndicator)
const AnimatedHeader = Animated.createAnimatedComponent(Header)
const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedSupportingText = Animated.createAnimatedComponent(SupportingText)
const AnimatedTextInput = Animated.createAnimatedComponent(Input) as React.FunctionComponent<
	AnimatedProps<FastOmit<TextInputProps, never>>
>

export const RenderTextInput = forwardRef<TextInput, RenderTextInputProps>(
	(
		{
			accessibilityLabel,
			activeIndicatorAnimatedStyle,
			content,
			contentSize,
			density,
			disabled,
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
			onSupportingTextVisibility,
			supportingText,
			supportingTextAnimatedStyle,
			supportingTextVisible,
			testID,
			trailing,
			...inputProps
		},
		ref
	) => {
		const theme = useTheme()
		const placeholderTextColor =
			disabled ?
				hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
			:	theme.token.scheme.onSurfaceVariant

		const {onFocus, onBlur, ...onTouchableHeaderEvent} = interactionHandlers
		const isLeadingShow = !!leading
		const shape = SHAPE.EXTRA_SMALL_TOP
		const underlayColor = theme.token.scheme.onSurface
		const underlayOpacities = useMemo(
			() => [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number],
			[theme.token.opacity.level0, theme.token.opacity.level1]
		)

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
						onFocus={onHeaderFocus}
						tabIndex={-1}
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
										disabled={disabled}
										multiline={multiline}
										onBlur={onBlur}
										onFocus={onFocus}
										placeholderTextColor={
											placeholderTextColor
										}
										ref={ref}
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

					<SupportingLayout
						onVisibility={onSupportingTextVisibility}
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
					</SupportingLayout>
				</Content>
			</Container>
		)
	}
)
