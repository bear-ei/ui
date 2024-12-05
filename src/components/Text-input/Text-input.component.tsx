import {FC, forwardRef} from 'react'
import {TextInput as RNTextInput} from 'react-native'
import Animated, {AnimatedProps} from 'react-native-reanimated'
import {FastOmit} from 'styled-components'
import {Underlay} from '../Underlay'
import {TextInputBase} from './Text-input-base.component'
import {InputProps, RenderTextInputProps, TextInputProps} from './Text-input.interface'
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
        Supporting,
        SupportingText,
        TouchableHeader,
        Trailing
} from './Text-input.styles'

/**
 * FIXME: Multiline text [macos]
 */
const AnimatedActiveIndicator = Animated.createAnimatedComponent(ActiveIndicator)
const AnimatedHeader = Animated.createAnimatedComponent(Header)
const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedSupportingText = Animated.createAnimatedComponent(SupportingText)
const AnimatedTextInput = Animated.createAnimatedComponent(Input) as React.FunctionComponent<
        AnimatedProps<FastOmit<InputProps, never>>
>

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
        onHeaderFocus,
        onStateEvent,
        onSupportingTextVisible,
        supportingText,
        supportingTextAnimatedStyle,
        supportingTextVisible,
        testID,
        trailing,
        underlayColor,
        ...inputProps
}: RenderTextInputProps) => {
        const shape = 'extraSmallTop'
        const leadingShow = !!leading
        const {onFocus, onBlur, ...onTouchableHeaderEvent} = onStateEvent

        return (
                <Container
                        {...(error && {
                                accessibilityLabel: supportingText,
                                accessibilityRole: 'alert'
                        })}
                        testID={testID ?? `textfield--${id}`}
                >
                        <Content testID={`textfield__content--${id}`}>
                                <TouchableHeader
                                        {...onTouchableHeaderEvent}
                                        {...(!error && {
                                                accessibilityLabel: labelText,
                                                accessibilityRole: 'keyboardkey'
                                        })}
                                        onFocus={onHeaderFocus}
                                        testID={`textfield__touchableHeader--${id}`}
                                >
                                        <AnimatedHeader
                                                leadingShow={leadingShow}
                                                shape={shape}
                                                style={[headerAnimatedStyle]}
                                                testID={`textfield__header--${id}`}
                                                trailingShow={!!trailing}
                                        >
                                                {leading && (
                                                        <Leading testID={`textfield__leading--${id}`}>
                                                                {leading}
                                                        </Leading>
                                                )}
                                                <Main
                                                        contentShow={!!content}
                                                        testID={`textfield__main--${id}`}
                                                >
                                                        {content}
                                                        <Control
                                                                multiline={multiline}
                                                                height={contentSize?.height}
                                                                testID={`textInput__control--${id}`}
                                                        >
                                                                <AnimatedTextInput
                                                                        {...inputProps}
                                                                        /**
                                                                         * enableFocusRing is used to disable the focus style in macOS,
                                                                         * this parameter has been implemented and is available.
                                                                         * However, react-native-macos does not have an official typescript declaration for this parameter,
                                                                         * so using it directly in a typescript will result in an undefined parameter.
                                                                         */
                                                                        enableFocusRing={false}
                                                                        multiline={multiline}
                                                                        onBlur={onBlur}
                                                                        onFocus={onFocus}
                                                                        style={[inputAnimatedStyle]}
                                                                        testID={`textInput__input--${id}`}
                                                                />
                                                        </Control>
                                                </Main>

                                                {trailing && (
                                                        <Trailing testID={`textfield__trailing--${id}`}>
                                                                {trailing}
                                                        </Trailing>
                                                )}

                                                <AnimatedLabel
                                                        leadingShow={leadingShow}
                                                        style={[labelAnimatedStyle]}
                                                        testID={`textInput__label--${id}`}
                                                >
                                                        <AnimatedLabelText
                                                                size='large'
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`textInput__labelText--${id}`}
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

                                <Supporting
                                        hidden={false}
                                        onVisible={onSupportingTextVisible}
                                        visible={supportingTextVisible}
                                >
                                        <AnimatedSupportingText
                                                size='small'
                                                style={[supportingTextAnimatedStyle]}
                                                type='body'
                                        >
                                                {supportingText}
                                        </AnimatedSupportingText>
                                </Supporting>
                        </Content>
                </Container>
        )
}

const ForwardRefTextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => (
        <TextInputBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const TextInput: FC<TextInputProps> = ForwardRefTextInput
