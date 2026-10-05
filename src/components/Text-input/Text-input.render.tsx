import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View, type ViewStyle} from 'react-native'
import {useTheme} from '../../hooks'
import {hexToRGBA, platformValue, processIconSize} from '../../utils'
import {AnimatedTextInput, AnimatedView} from '../Animated-component'
import {ICON_BUTTON_TYPE} from '../Icon-button'
import {SupportingText} from '../Supporting-text'
import {Underlay} from '../Underlay'
import type {RenderTextInputProps} from './Text-input.interface'
import {DENSITY_TYPE, SHAPE, SIZE, TYPOGRAPHY} from '../../theme'

/**
 * TODO: Support Multiline
 */
export const RenderTextInput = forwardRef<TextInput, RenderTextInputProps>(
	(
		{
			accessibilityLabel,
			activeIndicatorAnimatedStyle,
			autoCapitalize = 'none',
			autoComplete = 'off',
			autoCorrect = false,
			content,
			contentSize,
			disabled,
			editable,
			error,
			eventName,
			headerAnimatedStyle,
			id,
			inputAnimatedStyle,
			interactionHandlers,
			labelText,
			leadingElement,
			multiline,
			onHeaderFocus,
			onSupportingTextAnimationFinished,
			placeholder = 'Placeholder',
			size = SIZE.MEDIUM,
			supportingText,
			supportingTextVisible,
			testID,
			trailingElement,
			...inputProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses, typographyClasses} = token.classes
		const densityControlClasses = densityClasses()(DENSITY_TYPE.CONTROL)
		const densityInsetClasses = densityClasses()(DENSITY_TYPE.INSET)
		const placeholderTextColor =
			disabled ? hexToRGBA(token.scheme.onSurface)(token.opacity.level5) : token.scheme.onSurfaceVariant

		const {onFocus, onBlur, ...onTouchableHeaderEvent} = interactionHandlers
		const iconSize = processIconSize(token)(size)
		const isLeadingShow = !!leadingElement
		const isTrailingShow = !!trailingElement
		const shape = SHAPE.X_SMALL_TOP
		const underlayColor = token.scheme.onSurface
		const underlayOpacities = [token.opacity.level0, token.opacity.level1] as [number, number]
		const controlStyle = {
			minHeight: platformValue(contentSize?.height ?? token.density.control[SIZE.NONE])
		} as ViewStyle

		return (
			<View
				{...(error && {
					accessibilityLabel: accessibilityLabel ?? supportingText,
					accessibilityRole: 'alert'
				})}
				testID={testID ?? `textInput--${id}`}
			>
				<View
					className='flex flex-col gap-[--density-spacing-extra-small]'
					testID={`textInput__content--${id}`}
				>
					<Pressable
						{...onTouchableHeaderEvent}
						{...(!error && {
							accessibilityLabel: accessibilityLabel ?? labelText,
							accessibilityRole: 'keyboardkey'
						})}
						className={classesName(
							'flex cursor-text flex-col outline-none',
							`${densityControlClasses(size)} w-auto`
						)}
						onFocus={onHeaderFocus}
						tabIndex={-1}
						testID={`textInput__touchableHeader--${id}`}
					>
						<AnimatedView
							className={classesName(
								'relative z-10 flex min-w-20 flex-1 flex-row items-center',
								densityInsetClasses(size),
								shapeClasses(shape),
								{
									['pl-[--density-inset-none]']: isLeadingShow,
									['pr-[--density-inset-none]']: isTrailingShow
								}
							)}
							style={[headerAnimatedStyle]}
							testID={`textInput__animatedHeader--${id}`}
						>
							{leadingElement && (
								<View
									className={classesName(
										'flex flex-col items-center justify-center',
										densityControlClasses(size),
										{['justify-start']: multiline}
									)}
									testID={`textInput__leading--${id}`}
								>
									{cloneElement(leadingElement, {
										color: token.scheme.onSurfaceVariant,
										size: platformValue(iconSize),
										testID: `textInput__leadingIcon--${id}`
									})}
								</View>
							)}

							<View
								className={classesName('z-10 flex flex-1', {
									['flex-row flex-wrap gap-x-1 gap-y-2']: !!content,
									['flex-col justify-end']: !content
								})}
								testID={`textInput__main--${id}`}
							>
								{content}
								<View
									className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
									testID={`textInput__control--${id}`}
									style={[controlStyle]}
								>
									<AnimatedTextInput
										{...inputProps}
										autoCapitalize={autoCapitalize}
										autoComplete={autoComplete}
										autoCorrect={autoCorrect}
										className={classesName(
											'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
											typographyClasses(TYPOGRAPHY.BODY)(size)()
										)}
										editable={typeof disabled === 'boolean' ? !disabled : editable}
										multiline={multiline}
										onBlur={onBlur}
										onFocus={onFocus}
										placeholder={placeholder}
										placeholderTextColor={placeholderTextColor}
										ref={ref}
										style={[inputAnimatedStyle]}
										testID={`textInput__animatedTextInput--${id}`}
									/>
								</View>
							</View>

							{trailingElement && (
								<View
									className={classesName(
										'flex flex-col items-center justify-center',
										densityControlClasses(size),
										{['justify-start']: multiline}
									)}
									testID={`textInput__trailing--${id}`}
								>
									{cloneElement(trailingElement, {
										size,
										tabIndex: -1,
										type: ICON_BUTTON_TYPE.STANDARD
									})}
								</View>
							)}

							<AnimatedView
								className='absolute bottom-0 left-0 right-0 z-20 h-[--border-medium] origin-bottom'
								style={[activeIndicatorAnimatedStyle]}
								testID={`textInput__animatedActiveIndicator--${id}`}
							/>

							<Underlay
								eventName={eventName}
								opacities={underlayOpacities}
								testID={`textInput__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</AnimatedView>
					</Pressable>

					<SupportingText
						disabled={disabled}
						error={error}
						onAnimationFinished={onSupportingTextAnimationFinished}
						size={size}
						testID={`textInput__supportingLayoutAnimated--${id}`}
						visible={supportingTextVisible}
					>
						{supportingText}
					</SupportingText>
				</View>
			</View>
		)
	}
)

RenderTextInput.displayName = 'RenderTextInput'
