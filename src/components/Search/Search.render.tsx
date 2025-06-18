import {SHAPE} from '@bearei/element-token'
import {forwardRef, useMemo, type FC} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../Icon'
import {Underlay} from '../Underlay'
import type {RenderSearchProps, SearchTextInputProps} from './Search.interface'
import {Container, Content, Leading, Main, TextInput, TextInputLayout, Touchable, Trailing} from './Search.styles'

const SearchTextInput = TextInput as FC<SearchTextInputProps>
export const RenderSearch = forwardRef<RNTextInput, RenderSearchProps>(
	(
		{
			accessibilityLabel,
			containerRef,
			density,
			eventName,
			id,
			interactionHandlers,
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
		const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
		const placeholderTextColor = theme.token.scheme.onSurfaceVariant
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
				>
					<Content
						accessibilityLabel={accessibilityLabel ?? placeholder}
						accessibilityRole='keyboardkey'
						density={density}
						shape={shape}
						testID={`search__content--${id}`}
						trailingShow={!!trailing}
					>
						<Leading testID={`search__leading--${id}`}>
							{leading ?? (
								<Icon
									iconStyle={ICON_STYLE.ROUNDED}
									name={ICON_NAME.SEARCH}
									testID={`search__iconSearch--${id}`}
									type={ICON_TYPE.FILLED}
								/>
							)}
						</Leading>

						<Main testID={`search__main--${id}`}>
							<TextInputLayout testID={`search__textInputLayout--${id}`}>
								<SearchTextInput
									{...textInputProps}
									onBlur={onBlur}
									onChangeText={onChangeText}
									onFocus={onFocus}
									placeholder={placeholder}
									placeholderTextColor={placeholderTextColor}
									ref={ref}
									testID={`search__searchTextInput--${id}`}
									value={value}
								/>
							</TextInputLayout>
						</Main>

						{trailing && (
							<Trailing testID={`search__trailing--${id}`}>
								{trailing}
							</Trailing>
						)}
						<Underlay
							eventName={eventName}
							opacities={underlayOpacities}
							shape={listVisible ? SHAPE.EXTRA_LARGE_TOP : shape}
							testID={`search__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</Content>
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
