import {Search} from 'lucide-react-native'
import {cloneElement, forwardRef, useMemo} from 'react'
import {Pressable, TextInput, View} from 'react-native'

import {EVENT_NAME, LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	stepDownDensitySize,
	densitySizeMapTypographySize,
	hexToRGBA,
	RADIUS,
	SHAPE,
	TYPOGRAPHY
} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedTextInput, AnimatedView} from '../../Animated'
import {ICON_BUTTON_TYPE} from '../../Icon-button'
import {Underlay} from '../../Underlay'

import type {RenderSearchTextInputProps} from './Search-text-input.interface'

export const RenderSearchTextInput = forwardRef<TextInput, RenderSearchTextInputProps>(
	(
		{
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
			size = DENSITY_SIZE.MEDIUM,
			testID,
			trailingElement,
			value,
			...textInputProps
		},
		ref
	) => {
		const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
		const {token} = useTheme()
		const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
		const {classesName, densityClasses, typographyClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
		const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.HORIZONTAL)
		const iconSize = token.density.icon[stepDownDensitySize(size)]
		const isLeadingShow = !!leadingElement
		const isTrailingShow = !!trailingElement
		const placeholderTextColor =
			disabled ? hexToRGBA(token.scheme.onSurface)(token.opacity.level5) : token.scheme.onSurfaceVariant

		const underlayColor = token.scheme.onSurface
		const underlayOpacities = useMemo(
			() => [token.opacity.level0, token.opacity.level1, token.opacity.level0] as [number, number, number],
			[token.opacity.level0, token.opacity.level1]
		)

		return (
			<View
				className={classesName('relative justify-center self-stretch', `${densityControlClasses(size)} w-auto`)}
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
						className={classesName(
							'relative z-10 flex flex-1 flex-row items-center justify-between self-stretch',
							densityInsetClasses(size),

							{
								['pl-[--density-inset-none]']: isLeadingShow,
								['pr-[--density-inset-none]']: isTrailingShow
							}
						)}
						style={[contentAnimatedStyle]}
						testID={`searchTextInput__content--${id}`}
					>
						<View
							className={classesName(
								'flex flex-col items-center justify-center',
								densityControlClasses(size)
							)}
							testID={`searchTextInput__leading--${id}`}
						>
							{cloneElement(leadingElement, {
								color: token.scheme.onSurfaceVariant,
								disabled,
								size: platformValue(iconSize),
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
									editable={typeof disabled === 'boolean' ? !disabled : editable}
									className={classesName(
										'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
										typographyClasses(TYPOGRAPHY.BODY)(densitySizeMapTypographySize(size))()
									)}
									onBlur={onBlur}
									onChangeText={onChangeText}
									onFocus={onFocus}
									placeholder={placeholder}
									placeholderTextColor={placeholderTextColor}
									ref={ref}
									style={[inputAnimatedStyle]}
									testID={`searchTextInput__input--${id}`}
									value={value}
								/>
							</View>
						</View>

						{trailingElement && (
							<View
								className={classesName(
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
							eventName={underlayEventName}
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
)


