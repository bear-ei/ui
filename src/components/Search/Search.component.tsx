import {FC, forwardRef} from 'react'
import {TextInput} from 'react-native'
import {Icon} from '../Icon'
import {Underlay} from '../Underlay'
import {SearchBase} from './Search-base.component'
import {SearchList} from './Search-list'
import {RenderSearchProps, SearchProps, SearchTextInputProps} from './Search.interface'
import {Container, Content, Input, Leading, Main, TextField, Touchable, Trailing} from './Search.styles'

const SearchTextInput: FC<SearchTextInputProps> = Input
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
    trailing,
    underlayColor,
    value,
    ...textInputProps
}: RenderSearchProps) => {
    const {onBlur, onFocus, ...onTouchableEvent} = onStateEvent
    const shape = 'extraLarge'

    return (
        <Container
            {...(containerRef && {ref: containerRef})}
            testID={`search__container--${id}`}
        >
            <Touchable
                {...onTouchableEvent}
                accessibilityLabel={placeholder}
                accessibilityRole='keyboardkey'
                testID={`textfield__touchable--${id}`}
            >
                <Content
                    shape={shape}
                    testID={`search__content--${id}`}
                    trailingShow={!!trailing}
                >
                    <Leading testID={`search__leading--${id}`}>
                        {leading ?? (
                            <Icon
                                iconStyle='outlined'
                                type='filled'
                                name='search'
                            />
                        )}
                    </Leading>

                    <Main testID={`search__main--${id}`}>
                        <TextField testID={`search__textField--${id}`}>
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
                        </TextField>
                    </Main>

                    {trailing && <Trailing testID={`search__trailing--${id}`}>{trailing}</Trailing>}

                    <Underlay
                        eventName={eventName}
                        opacities={[0, 0.08]}
                        shape={listVisible ? 'extraLargeTop' : shape}
                        underlayColor={underlayColor}
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

const ForwardRefSearch = forwardRef<TextInput, SearchProps>((props, ref) => (
    <SearchBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Search: FC<SearchProps> = ForwardRefSearch
