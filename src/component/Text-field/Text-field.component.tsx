import {FC, forwardRef} from 'react'
import {TextInput} from 'react-native'
import Animated from 'react-native-reanimated'
import {Underlay} from '../Underlay'
import {TextFieldBase} from './Text-field-base.component'
import {RenderTextFieldProps, TextFieldProps} from './Text-field.interface'
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
    SupportingText,
    TouchableHeader,
    Trailing
} from './Text-field.style'

/**
 * FIXME: Multiline text [macos]
 */
const AnimatedActiveIndicator = Animated.createAnimatedComponent(ActiveIndicator)
const AnimatedHeader = Animated.createAnimatedComponent(Header)
const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedSupportingText = Animated.createAnimatedComponent(SupportingText)
const AnimatedTextInput = Animated.createAnimatedComponent(Input)
const render = ({
    activeIndicatorAnimatedStyle,
    content,
    contentSize,
    error,
    eventName,
    headerAnimatedStyle,
    id,
    inputAnimatedStyle,
    labelAnimatedStyle,
    labelText,
    labelTextAnimatedStyle,
    leading,
    multiline,
    onStateEvent,
    supportingText,
    supportingTextAnimatedStyle,
    trailing,
    underlayColor,
    ...inputProps
}: RenderTextFieldProps) => {
    const shape = 'extraSmallTop'
    const leadingShow = !!leading
    const {onFocus, onBlur, ...onTouchableHeaderEvent} = onStateEvent

    return (
        <Container
            {...(error && {
                accessibilityLabel: supportingText,
                accessibilityRole: 'alert'
            })}
            testID={`textfield--${id}`}
        >
            <Content testID={`textfield__content--${id}`}>
                <TouchableHeader
                    {...onTouchableHeaderEvent}
                    {...(!error && {
                        accessibilityLabel: labelText,
                        accessibilityRole: 'keyboardkey'
                    })}
                    testID={`textfield__touchableHeader--${id}`}
                >
                    <AnimatedHeader
                        leadingShow={leadingShow}
                        shape={shape}
                        style={[headerAnimatedStyle]}
                        testID={`textfield__header--${id}`}
                        trailingShow={!!trailing}
                    >
                        {leading && <Leading testID={`textfield__leading--${id}`}>{leading}</Leading>}
                        <Main
                            contentShow={!!content}
                            testID={`textfield__main--${id}`}
                        >
                            {content ?? (
                                <Control
                                    multiline={multiline}
                                    height={contentSize?.height}
                                    testID={`textField__control--${id}`}
                                >
                                    <AnimatedTextInput
                                        {...inputProps}
                                        /**
                                         * enableFocusRing is used to disable the focus style in macOS,
                                         * this parameter has been implemented and is available.
                                         * However, react-native-macos does not have an official typescript declaration for this parameter,
                                         * so using it directly in a typescript will result in an undefined parameter.
                                         */
                                        // @ts-ignore
                                        enableFocusRing={false}
                                        multiline={multiline}
                                        onBlur={onBlur}
                                        onFocus={onFocus}
                                        style={[inputAnimatedStyle]}
                                        testID={`textField__input--${id}`}
                                    />
                                </Control>
                            )}
                        </Main>

                        {trailing && <Trailing testID={`textfield__trailing--${id}`}>{trailing}</Trailing>}

                        <AnimatedLabel
                            leadingShow={leadingShow}
                            style={[labelAnimatedStyle]}
                            testID={`textField__label--${id}`}
                        >
                            <AnimatedLabelText
                                size='large'
                                style={[labelTextAnimatedStyle]}
                                testID={`textField__labelText--${id}`}
                                type='body'
                            >
                                {labelText}
                            </AnimatedLabelText>
                        </AnimatedLabel>

                        <AnimatedActiveIndicator
                            style={[activeIndicatorAnimatedStyle]}
                            testID={`textfield__activeIndicator--${id}`}
                        />

                        <Underlay
                            eventName={eventName}
                            opacities={[0, 0.08]}
                            underlayColor={underlayColor}
                        />
                    </AnimatedHeader>
                </TouchableHeader>

                <AnimatedSupportingText
                    size='small'
                    style={[supportingTextAnimatedStyle]}
                    type='body'
                >
                    {supportingText}
                </AnimatedSupportingText>
            </Content>
        </Container>
    )
}

const ForwardRefTextField = forwardRef<TextInput, TextFieldProps>((props, ref) => (
    <TextFieldBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TextField: FC<TextFieldProps> = ForwardRefTextField
