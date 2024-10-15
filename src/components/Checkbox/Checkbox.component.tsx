import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CheckboxBase} from './Checkbox-base.component'
import {CheckboxProps, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconContainer, Main} from './Checkbox.styles'

const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer)
const render = ({
    densityScale,
    disabled,
    error,
    eventName,
    iconAnimatedStyle,
    iconSvgStyle,
    id,
    onStateEvent,
    theme,
    type,
    underlayColor,
    ...contentProps
}: RenderCheckboxProps) => {
    const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
    const unselectedFill = type === 'unselected' ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary
    const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
    const shape = 'full'

    return (
        <Container
            accessibilityRole='checkbox'
            densityScale={densityScale}
            testID={`checkbox--${id}`}
        >
            <Touchable
                {...onStateEvent}
                disabled={disabled}
                shape={shape}
                underlayColor={underlayColor}
            >
                <Content
                    {...contentProps}
                    densityScale={densityScale}
                    pointerEvents='none'
                    shape={shape}
                    testID={`checkbox__content--${id}`}
                >
                    <Main
                        shape='tinySmall'
                        testID={`checkbox__main--${id}`}
                    >
                        <IconContainer
                            testID={`checkbox__iconContainer--${id}`}
                            visible={true}
                        >
                            <Icon
                                densityScale={-1.5}
                                disabled={disabled}
                                fill={checkBoxOutlineFill}
                                iconStyle='outlined'
                                name='checkBoxOutlineBlank'
                                svgStyle={iconSvgStyle}
                                type='filled'
                            />
                        </IconContainer>

                        <AnimatedIconContainer
                            style={[iconAnimatedStyle]}
                            testID={`checkbox__iconContainer--${id}`}
                            visible={type === 'indeterminate'}
                            zIndex={1}
                        >
                            <Icon
                                densityScale={-1.5}
                                disabled={disabled}
                                fill={activeFill}
                                iconStyle='outlined'
                                name='indeterminateCheckBox'
                                svgStyle={iconSvgStyle}
                                type='filled'
                            />
                        </AnimatedIconContainer>

                        <AnimatedIconContainer
                            style={[iconAnimatedStyle]}
                            testID={`checkbox__iconContainer--${id}`}
                            visible={type === 'selected'}
                            zIndex={1}
                        >
                            <Icon
                                densityScale={-1.5}
                                disabled={disabled}
                                fill={activeFill}
                                iconStyle='outlined'
                                name='checkBox'
                                svgStyle={iconSvgStyle}
                                type='filled'
                            />
                        </AnimatedIconContainer>
                    </Main>

                    <Underlay
                        eventName={eventName}
                        shape={shape}
                        underlayColor={underlayColor}
                    />
                </Content>
            </Touchable>
        </Container>
    )
}

const ForwardRefCheckbox = forwardRef<View, CheckboxProps>((props, ref) => (
    <CheckboxBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Checkbox: FC<CheckboxProps> = ForwardRefCheckbox
