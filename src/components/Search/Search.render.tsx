import {hexToRGBA, SHAPE} from '@bearei/element-token'
import {cloneElement, forwardRef, useMemo} from 'react'
import type {TextInput} from 'react-native'
import Animated, {type AnimatedProps} from 'react-native-reanimated'
import type {FastOmit} from 'styled-components'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_TYPE} from '../Icon'
import type {TextInputProps} from '../Text-input'
import {Underlay} from '../Underlay'
import type {RenderSearchProps} from './Search.interface'
import {Container, Content, Control, Input, Leading, Main, Touchable, Trailing} from './Search.styles'

const AnimatedTextInput = Animated.createAnimatedComponent(Input) as React.FunctionComponent<
	AnimatedProps<FastOmit<TextInputProps, never>>
>

const AnimatedContent = Animated.createAnimatedComponent(Content)
export const RenderSearch = forwardRef<TextInput, RenderSearchProps>(
	(
		{
			accessibilityLabel,
			containerRef,
			contentAnimatedStyle,
			density,
			disabled,
			eventName,
			id,
			inputAnimatedStyle,
			interactionHandlers,
			layout: _,
			leading,
			listVisible,
			onChangeText,
			placeholder,
			testID,
			trailing,
			value,
			...textInputProps
		},
		ref
	) => {
		const theme = useTheme()
		const placeholderTextColor =
			disabled ?
				hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
			:	theme.token.scheme.onSurfaceVariant

		const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
		const shape = SHAPE.EXTRA_LARGE
		const underlayColor = theme.token.scheme.onSurface
		const underlayOpacities = useMemo(
			() => [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number],
			[theme.token.opacity.level0, theme.token.opacity.level1]
		)

		return (
			<Container
				{...(containerRef && {ref: containerRef})}
				testID={testID ?? `search--${id}`}
			>
				<Touchable
					{...touchableInteractionHandlers}
					testID={`search__touchable--${id}`}
					tabIndex={-1}
				>
					<AnimatedContent
						accessibilityLabel={accessibilityLabel ?? placeholder}
						accessibilityRole='keyboardkey'
						density={density}
						shape={shape}
						style={[contentAnimatedStyle]}
						testID={`search__content--${id}`}
						trailingShow={!!trailing}
					>
						<Leading testID={`search__leading--${id}`}>
							{cloneElement(
								leading ?? (
									<Icon
										name={ICON_NAME.SEARCH}
										testID={`search__iconSearch--${id}`}
										type={ICON_TYPE.FILLED}
									/>
								),
								{disabled}
							)}
						</Leading>

						<Main testID={`search__main--${id}`}>
							<Control testID={`search__control--${id}`}>
								<AnimatedTextInput
									{...textInputProps}
									disabled={disabled}
									onBlur={onBlur}
									onChangeText={onChangeText}
									onFocus={onFocus}
									placeholder={placeholder}
									placeholderTextColor={placeholderTextColor}
									ref={ref}
									style={[inputAnimatedStyle]}
									testID={`search__searchTextInput--${id}`}
									value={value}
								/>
							</Control>
						</Main>

						{trailing && (
							<Trailing testID={`search__trailing--${id}`}>
								{cloneElement(trailing, {disabled})}
							</Trailing>
						)}
						<Underlay
							eventName={eventName}
							opacities={underlayOpacities}
							shape={listVisible ? SHAPE.EXTRA_LARGE_TOP : shape}
							testID={`search__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</AnimatedContent>
				</Touchable>

				{/* <SearchList
				{...listProps}
				containerLayout={layout}
				testID={`search__searchList--${id}`}
			/> */}
			</Container>
		)
	}
)
