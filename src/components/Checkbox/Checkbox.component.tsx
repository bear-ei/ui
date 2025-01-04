import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {Icon} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CheckboxBase} from './Checkbox-base.component'
import {CheckboxIconAnimatedOptions, CheckboxProps, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconContainer, Main} from './Checkbox.styles'

const render = ({
        disabled,
        error,
        eventName,
        id,
        onStateEvent,
        testID,
        theme,
        type,
        ...contentProps
}: RenderCheckboxProps) => {
        const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
        const unselectedFill = type === 'unselected' ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary
        const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
        const shape = 'full'
        const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
        const iconStyle = {
                width: iconSize,
                height: iconSize
        }

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
                <Container testID={testID ?? `checkbox--${id}`}>
                        <Touchable
                                {...onStateEvent}
                                disabled={disabled}
                                mainAlignSelf='center'
                                shape={shape}
                                testID={`checkbox__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityRole='checkbox'
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
                                                                {...iconStyle}
                                                                disabled={disabled}
                                                                fill={checkBoxOutlineFill}
                                                                iconStyle='rounded'
                                                                name='checkBoxOutlineBlank'
                                                                svgStyle={iconSvgStyle}
                                                                type='filled'
                                                        />
                                                </IconContainer>

                                                <IconContainer
                                                        {...animatedOptions}
                                                        testID={`checkbox__iconContainer--${id}`}
                                                        visible={type === 'selected'}
                                                >
                                                        <Icon
                                                                {...iconStyle}
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle='rounded'
                                                                name='checkBox'
                                                                svgStyle={iconSvgStyle}
                                                                testID={`checkbox__iconSelected--${id}`}
                                                                type='filled'
                                                        />
                                                </IconContainer>

                                                <IconContainer
                                                        {...animatedOptions}
                                                        testID={`checkbox__iconContainer--${id}`}
                                                        visible={type === 'indeterminate'}
                                                >
                                                        <Icon
                                                                {...iconStyle}
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle='rounded'
                                                                name='indeterminateCheckBox'
                                                                svgStyle={iconSvgStyle}
                                                                testID={`checkbox__iconIndeterminate--${id}`}
                                                                type='filled'
                                                        />
                                                </IconContainer>
                                        </Main>

                                        <Underlay
                                                eventName={eventName}
                                                shape={shape}
                                                testID={`checkbox__underlay--${id}`}
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
