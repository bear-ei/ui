import {Search} from 'lucide-react-native'
import {cloneElement, useMemo, type FC} from 'react'
import {Pressable, View} from 'react-native'

import type {RenderSearchTextInputProps} from './Search-text-input.interface'

import {EVENT_NAME, ORIENTATION} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	toTypographySize,
	hexToRGBA,
	RADIUS,
	SHAPE,
	stepDownDensitySize,
	TYPOGRAPHY
} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
import {AnimatedTextInput, AnimatedView} from '../../Animated'
import {ICON_BUTTON_TYPE} from '../../Icon-button'
import {Underlay} from '../../Underlay'

export const RenderSearchTextInput: FC<RenderSearchTextInputProps> = ({
	accessibilityLabel,
	autoCapitalize = 'none',
	autoComplete = 'off',
	autoCorrect = false,
	contentAnimatedStyle,
	disabled,
	editable,
	eventName,
	id,
	inputAnimatedStyle,
	interactionHandlers,
	leadingElement = <Search />,
	listVisible,
	onChangeText,
	placeholder,
	ref,
	size = DENSITY_SIZE.MEDIUM,
	testID,
	trailingElement,
	value,
	...textInputProps
}) => {
	const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
	const {token} = useTheme()
	const {classes, colors, density, opacity} = token
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const {classNames, densityClasses, typographyClasses} = classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const iconSize = density.icon[stepDownDensitySize(size)]
	const isLeadingShow = !!leadingElement
	const isTrailingShow = !!trailingElement
	const placeholderTextColor = disabled ? hexToRGBA(colors.onSurface, opacity.level5) : colors.onSurfaceVariant
	const underlayColor = colors.onSurface
	const underlayOpacities = useMemo(
		() => [opacity.level0, opacity.level1, opacity.level0] as [number, number, number],
		[opacity.level0, opacity.level1]
	)

	return (
		<View
			className={classNames('relative justify-center self-stretch', `${densityControlClasses(size)} w-auto`)}
			testID={testID ?? `searchTextInput--${id}`}
		>
			<Pressable
				{...touchableInteractionHandlers}
				className='flex-1 cursor-text outline-none'
				tabIndex={-1}
				testID={`searchTextInput__touchable--${id}`}
			>
				<AnimatedView
					accessibilityLabel={accessibilityLabel ?? placeholder}
					accessibilityRole='search'
					className={classNames(
						'relative z-10 flex flex-1 flex-row items-center justify-between self-stretch',
						densityInsetClasses(size),

						{
							['pl-[--density-inset-none]']: isLeadingShow,
							['pr-[--density-inset-none]']: isTrailingShow
						}
					)}
					style={contentAnimatedStyle}
					testID={`searchTextInput__content--${id}`}
				>
					<View
						className={classNames('flex flex-col items-center justify-center', densityControlClasses(size))}
						testID={`searchTextInput__leading--${id}`}
					>
						{cloneElement(leadingElement, {
							color: colors.onSurfaceVariant,
							disabled,
							size: toPlatformUnit(iconSize),
							testID: `searchTextInput__leadingIcon--${id}`
						})}
					</View>

					<View
						className='z-10 flex flex-1 flex-col justify-center self-stretch'
						testID={`searchTextInput__main--${id}`}
					>
						<View
							className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
							testID={`searchTextInput__control--${id}`}
						>
							<AnimatedTextInput
								{...textInputProps}
								autoCapitalize={autoCapitalize}
								autoComplete={autoComplete}
								autoCorrect={autoCorrect}
								className={classNames(
									'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
									typographyClasses(TYPOGRAPHY.BODY)(toTypographySize(size))
								)}
								editable={typeof disabled === 'boolean' ? !disabled : editable}
								onBlur={onBlur}
								onChangeText={onChangeText}
								onFocus={onFocus}
								placeholder={placeholder}
								placeholderTextColor={placeholderTextColor}
								ref={ref}
								style={inputAnimatedStyle}
								testID={`searchTextInput__input--${id}`}
								value={value}
							/>
						</View>
					</View>

					{trailingElement && (
						<View
							className={classNames(
								'flex flex-col items-center justify-center',
								densityControlClasses(size)
							)}
							testID={`searchTextInput__trailing--${id}`}
						>
							{cloneElement(trailingElement, {
								disabled,
								size,
								tabIndex: -1,
								type: ICON_BUTTON_TYPE.STANDARD
							})}
						</View>
					)}

					<Underlay
						interactionEventName={underlayEventName}
						opacities={underlayOpacities}
						radius={listVisible ? RADIUS.MEDIUM : RADIUS.XX_LARGE}
						shape={listVisible ? SHAPE.TOP : SHAPE.ALL}
						testID={`searchTextInput__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</AnimatedView>
			</Pressable>
		</View>
	)
}
