import {SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {TextInput as RNTextInput} from 'react-native'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../Icon'
import {Underlay} from '../Underlay'
import {SearchBase} from './Search-base.component'
import type {RenderSearchProps, SearchProps, SearchTextInputProps} from './Search.interface'
import {Container, Content, Leading, Main, TextInput, TextInputLayout, Touchable, Trailing} from './Search.styles'

const SearchTextInput = TextInput as FC<SearchTextInputProps>
const renderSearch = ({
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
	theme,
	trailing,
	value,
	...textInputProps
}: RenderSearchProps) => {
	const {onBlur, onFocus, ...onTouchableEvent} = interactionHandlers
	const placeholderTextColor = theme.token.scheme.onSurfaceVariant
	const shape = SHAPE.EXTRA_LARGE
	const underlayColor = theme.token.scheme.onSurface
	const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]

	return (
		<Container
			{...(containerRef && {ref: containerRef})}
			testID={testID ?? `search--${id}`}
		>
			<Touchable
				{...onTouchableEvent}
				testID={`search__touchable--${id}`}
			>
				<Content
					accessibilityLabel={placeholder}
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
								/**
								 * enableFocusRing is used to disable the focus style in macOS,
								 * this parameter has been implemented and is available.
								 * However, react-native-macos does not have an official typescript declaration for this parameter,
								 * so using it directly in a typescript will result in an undefined parameter.
								 */
								enableFocusRing={false}
								onBlur={onBlur}
								onChangeText={onChangeText}
								onFocus={onFocus}
								placeholder={placeholder}
								placeholderTextColor={placeholderTextColor}
								testID={`search__searchTextInput--${id}`}
								value={value}
							/>
						</TextInputLayout>
					</Main>

					{trailing && <Trailing testID={`search__trailing--${id}`}>{trailing}</Trailing>}
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

const SearchWithRef = forwardRef<RNTextInput, SearchProps>((props, ref) => (
	<SearchBase
		{...props}
		ref={ref}
		renderSearch={renderSearch}
	/>
))

export const Search = SearchWithRef
