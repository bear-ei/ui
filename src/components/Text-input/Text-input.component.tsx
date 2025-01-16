import {cloneElement, FC, forwardRef} from 'react'
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
        SupportingLayoutAnimated,
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
        theme,
        trailing,
        ...inputProps
}: RenderTextInputProps) => {
        const shape = 'extraSmallTop'
        const leadingShow = !!leading
        const underlayColor = theme.token.scheme.onSurface
        const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]
        const {onFocus, onBlur, ...onTouchableHeaderEvent} = onStateEvent

        return (
                <Container
                        {...(error && {
                                accessibilityLabel: supportingText,
                                accessibilityRole: 'alert'
                        })}
                >
                        <Content>
                                <TouchableHeader
                                        {...onTouchableHeaderEvent}
                                        {...(!error && {
                                                accessibilityLabel: labelText,
                                                accessibilityRole: 'keyboardkey'
                                        })}
                                        enableFocusRing={false}
                                        onFocus={onHeaderFocus}
                                >
                                        <AnimatedHeader
                                                leadingShow={leadingShow}
                                                shape={shape}
                                                style={[headerAnimatedStyle]}
                                                trailingShow={!!trailing}
                                        >
                                                {leading && (
                                                        <Leading>
                                                                {cloneElement(leading, {disabledFocus: true})}
                                                        </Leading>
                                                )}

                                                <Main contentShow={!!content}>
                                                        {content}
                                                        <Control
                                                                multiline={multiline}
                                                                height={contentSize?.height}
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
                                                                />
                                                        </Control>
                                                </Main>

                                                {trailing && (
                                                        <Trailing>
                                                                {cloneElement(trailing, {disabledFocus: true})}
                                                        </Trailing>
                                                )}

                                                <AnimatedLabel
                                                        leadingShow={leadingShow}
                                                        style={[labelAnimatedStyle]}
                                                >
                                                        <AnimatedLabelText
                                                                size='large'
                                                                style={[labelTextAnimatedStyle]}
                                                                type='body'
                                                        >
                                                                {labelText}
                                                        </AnimatedLabelText>
                                                </AnimatedLabel>

                                                <AnimatedActiveIndicator style={[activeIndicatorAnimatedStyle]} />

                                                <Underlay
                                                        eventName={eventName}
                                                        opacities={underlayOpacities}
                                                        underlayColor={underlayColor}
                                                />
                                        </AnimatedHeader>
                                </TouchableHeader>

                                <SupportingLayoutAnimated
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
                                </SupportingLayoutAnimated>
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
