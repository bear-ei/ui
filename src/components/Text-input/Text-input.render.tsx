import {cloneElement, useMemo, type FC} from 'react'
import {Pressable, View, type ViewStyle} from 'react-native'

import type {RenderTextInputProps} from './Text-input.interface'

import {ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	stepDownDensitySize,
	toTypographySize,
	hexToRGBA,
	RADIUS,
	SHAPE,
	TYPOGRAPHY
} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {AnimatedTextInput, AnimatedView} from '../Animated'
import {ICON_BUTTON_TYPE} from '../Icon-button'
import {SupportingText} from '../Supporting-text'
import {Underlay} from '../Underlay'

/**
 * TODO: Support Multiline
 */
export const RenderTextInput: FC<RenderTextInputProps> = ({
	accessibilityLabel,
	activeIndicatorAnimatedStyle,
	autoCapitalize = 'none',
	autoComplete = 'off',
	autoCorrect = false,
	contentSize,
	disabled,
	editable,
	error,
	eventName,
	headerAnimatedStyle,
	headerContent,
	id,
	inputAnimatedStyle,
	interactionHandlers,
	labelText,
	leadingElement,
	multiline,
	onHeaderFocus,
	onSupportingTextAnimationFinished,
	placeholder = 'Placeholder',
	ref,
	size = DENSITY_SIZE.MEDIUM,
	supportingText,
	supportingTextVisible,
	testID,
	trailingElement,
	...inputProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const placeholderTextColor =
		disabled ? hexToRGBA(token.colors.onSurface, token.opacity.level5) : token.colors.onSurfaceVariant

	const {onBlur, onFocus, ...onTouchableHeaderEvent} = interactionHandlers
	const iconSize = token.density.icon[stepDownDensitySize(size)]
	const isLeadingShow = !!leadingElement
	const isTrailingShow = !!trailingElement
	const shape = SHAPE.TOP
	const radius = RADIUS.X_SMALL
	const underlayColor = token.colors.onSurface
	const underlayOpacities = useMemo(() => [token.opacity.level0, token.opacity.level1] as [number, number], [token])
	const controlStyle = {
		minHeight: toPlatformUnit(contentSize?.height ?? token.density.control[DENSITY_SIZE.NONE])
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
				className='flex flex-col gap-[--density-spacing-x-small]'
				testID={`textInput__content--${id}`}
			>
				<Pressable
					{...onTouchableHeaderEvent}
					{...(!error && {
						accessibilityLabel: accessibilityLabel ?? labelText,
						accessibilityRole: 'keyboardkey'
					})}
					className={classNames(
						'flex cursor-text flex-col outline-none',
						`${densityControlClasses(size)} w-auto`
					)}
					onFocus={onHeaderFocus}
					tabIndex={-1}
					testID={`textInput__touchableHeader--${id}`}
				>
					<AnimatedView
						className={classNames(
							'relative z-10 flex min-w-20 flex-1 flex-row items-center',
							densityInsetClasses(size),
							shapeClasses(shape)(radius),
							{
								['pl-[--density-inset-none]']: isLeadingShow,
								['pr-[--density-inset-none]']: isTrailingShow
							}
						)}
						style={headerAnimatedStyle}
						testID={`textInput__animatedHeader--${id}`}
					>
						{leadingElement && (
							<View
								className={classNames(
									'flex flex-col items-center justify-center',
									densityControlClasses(size),
									{['justify-start']: multiline}
								)}
								testID={`textInput__leading--${id}`}
							>
								{cloneElement(leadingElement, {
									color: token.colors.onSurfaceVariant,
									size: toPlatformUnit(iconSize),
									testID: `textInput__leadingIcon--${id}`
								})}
							</View>
						)}

						<View
							className={classNames('z-10 flex flex-1', {
								['flex-col justify-end']: !headerContent,
								['flex-row flex-wrap gap-x-[--density-spacing-x-small] gap-y-[--density-spacing-small]']:
									!!headerContent
							})}
							testID={`textInput__main--${id}`}
						>
							{headerContent}
							<View
								className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
								style={controlStyle}
								testID={`textInput__control--${id}`}
							>
								<AnimatedTextInput
									{...inputProps}
									autoCapitalize={autoCapitalize}
									autoComplete={autoComplete}
									autoCorrect={autoCorrect}
									className={classNames(
										'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
										typographyClasses(TYPOGRAPHY.BODY)(toTypographySize(size))
									)}
									editable={typeof disabled === 'boolean' ? !disabled : editable}
									multiline={multiline}
									onBlur={onBlur}
									onFocus={onFocus}
									placeholder={placeholder}
									placeholderTextColor={placeholderTextColor}
									ref={ref}
									style={inputAnimatedStyle}
									testID={`textInput__animatedTextInput--${id}`}
								/>
							</View>
						</View>

						{trailingElement && (
							<View
								className={classNames(
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
							style={activeIndicatorAnimatedStyle}
							testID={`textInput__animatedActiveIndicator--${id}`}
						/>

						<Underlay
							interactionEventName={eventName}
							opacities={underlayOpacities}
							radius={radius}
							shape={shape}
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
