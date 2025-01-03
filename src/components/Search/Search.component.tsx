import {FC, forwardRef} from 'react'
import {TextInput as RNTextInput} from 'react-native'
import {Icon} from '../Icon'
import {Underlay} from '../Underlay'
import {SearchBase} from './Search-base.component'
import {SearchList} from './Search-list'
import {RenderSearchProps, SearchProps, SearchTextInputProps} from './Search.interface'
import {Container, Content, Leading, Main, TextInput, TextInputContainer, Touchable, Trailing} from './Search.styles'

const SearchTextInput: FC<SearchTextInputProps> = TextInput
const render = ({
        containerRef,
        eventName,
        id,
        layout,
        leading,
        listProps,
        listVisible,
        onChangeText,
        onStateEvent,
        placeholder,
        placeholderTextColor,
        testID,
        trailing,
        underlayColor,
        underlayOpacities,
        value,
        ...textInputProps
}: RenderSearchProps) => {
        const {onBlur, onFocus, ...onTouchableEvent} = onStateEvent
        const shape = 'extraLarge'

        return (
                <Container
                        {...(containerRef && {ref: containerRef})}
                        testID={testID ?? `search__container--${id}`}
                >
                        <Touchable
                                {...onTouchableEvent}
                                testID={`textfield__touchable--${id}`}
                        >
                                <Content
                                        accessibilityLabel={placeholder}
                                        accessibilityRole='keyboardkey'
                                        shape={shape}
                                        testID={`search__content--${id}`}
                                        trailingShow={!!trailing}
                                >
                                        <Leading testID={`search__leading--${id}`}>
                                                {leading ?? (
                                                        <Icon
                                                                iconStyle='rounded'
                                                                name='search'
                                                                testID={`search__icon--${id}`}
                                                                type='filled'
                                                        />
                                                )}
                                        </Leading>

                                        <Main testID={`search__main--${id}`}>
                                                <TextInputContainer testID={`search__textInput--${id}`}>
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
                                                                testID={`search__input--${id}`}
                                                                value={value}
                                                        />
                                                </TextInputContainer>
                                        </Main>

                                        {trailing && <Trailing testID={`search__trailing--${id}`}>{trailing}</Trailing>}
                                        <Underlay
                                                eventName={eventName}
                                                opacities={underlayOpacities}
                                                shape={listVisible ? 'extraLargeTop' : shape}
                                                underlayColor={underlayColor}
                                                testID={`search__underlay--${id}`}
                                        />
                                </Content>
                        </Touchable>

                        <SearchList
                                {...listProps}
                                containerLayout={layout}
                        />
                </Container>
        )
}

const ForwardRefSearch = forwardRef<RNTextInput, SearchProps>((props, ref) => (
        <SearchBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Search: FC<SearchProps> = ForwardRefSearch
