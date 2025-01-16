import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {Icon} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CheckboxBase} from './Checkbox-base.component'
import {CheckboxIconAnimatedOptions, CheckboxProps, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconContainer, Main} from './Checkbox.styles'

const render = ({disabled, error, eventName, onStateEvent, theme, type, ...contentProps}: RenderCheckboxProps) => {
        const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
        const unselectedFill = type === 'unselected' ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary
        const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
        const shape = 'full'
        const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)

        const checkUnderlayColor =
                type === 'unselected' ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

        const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
        const iconSvgStyle = {
                minWidth: theme.adaptSize(theme.token.spacing.large),
                minHeight: theme.adaptSize(theme.token.spacing.large)
        }

        const animatedOptions = {
                animatedType: 'scale',
                entry: {duration: 'short2'},
                exit: {duration: 'short1'}
        } as CheckboxIconAnimatedOptions

        return (
                <Container>
                        <Touchable
                                {...onStateEvent}
                                disabled={disabled}
                                mainAlignSelf='center'
                                shape={shape}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityRole='checkbox'
                                        pointerEvents='none'
                                        shape={shape}
                                >
                                        <Main shape='tinySmall'>
                                                <IconContainer visible={true}>
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={checkBoxOutlineFill}
                                                                iconStyle='rounded'
                                                                name='checkBoxOutlineBlank'
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                type='filled'
                                                        />
                                                </IconContainer>

                                                <IconContainer
                                                        {...animatedOptions}
                                                        visible={type === 'selected'}
                                                >
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle='rounded'
                                                                name='checkBox'
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                type='filled'
                                                        />
                                                </IconContainer>

                                                <IconContainer
                                                        {...animatedOptions}
                                                        visible={type === 'indeterminate'}
                                                >
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle='rounded'
                                                                name='indeterminateCheckBox'
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                type='filled'
                                                        />
                                                </IconContainer>
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
