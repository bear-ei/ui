import {Duration, ShapeType} from '@bearei/material-token'
import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {DensityScale} from '../Common'
import {Icon, IconName, IconStyle, IconType} from '../Icon'
import {LayoutAnimatedType} from '../Layout-animated'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CheckboxBase} from './Checkbox-base.component'
import {CheckboxValue} from './Checkbox.enum'
import {CheckboxIconAnimatedOptions, CheckboxProps, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconLayout, Main} from './Checkbox.styles'

const render = ({
        densityScale = DensityScale.LEVEL_0,
        disabled,
        error,
        eventName,
        id,
        stateOnEvent,
        testID,
        theme,
        value,
        ...contentProps
}: RenderCheckboxProps) => {
        const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
        const unselectedFill =
                value === CheckboxValue.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

        const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
        const shape = ShapeType.FULL
        const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
        const checkUnderlayColor =
                value === CheckboxValue.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

        const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
        const iconSvgStyle = {
                minWidth: theme.adaptSize(theme.token.spacing.large),
                minHeight: theme.adaptSize(theme.token.spacing.large)
        }

        const animatedOptions = {
                animatedType: LayoutAnimatedType.SCALE,
                entry: {duration: Duration.SHORT_2},
                exit: {duration: Duration.SHORT_1}
        } as CheckboxIconAnimatedOptions

        return (
                <Container testID={testID ?? `checkbox--${id}`}>
                        <Touchable
                                {...stateOnEvent}
                                disabled={disabled}
                                mainAlignSelf='center'
                                shape={shape}
                                testID={`checkbox__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityRole='checkbox'
                                        densityScale={densityScale}
                                        pointerEvents='none'
                                        shape={shape}
                                        testID={`checkbox__content--${id}`}
                                >
                                        <Main
                                                shape={ShapeType.TINY_SMALL}
                                                testID={`checkbox__main--${id}`}
                                        >
                                                <IconLayout
                                                        testID={`checkbox__iconLayout--${id}`}
                                                        visible={true}
                                                >
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={checkBoxOutlineFill}
                                                                iconStyle={IconStyle.ROUNDED}
                                                                name={IconName.CHECK_BOX_OUTLINE_BLANK}
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                testID={`checkbox__iconCheckBoxOutlineBlank--${id}`}
                                                                type={IconType.FILLED}
                                                        />
                                                </IconLayout>

                                                <IconLayout
                                                        {...animatedOptions}
                                                        testID={`checkbox__iconLayout--${id}`}
                                                        visible={value === CheckboxValue.SELECTED}
                                                >
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle={IconStyle.ROUNDED}
                                                                name={IconName.CHECK_BOX}
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                testID={`checkbox__iconCheckBox--${id}`}
                                                                type={IconType.FILLED}
                                                        />
                                                </IconLayout>

                                                <IconLayout
                                                        {...animatedOptions}
                                                        testID={`checkbox__iconLayout--${id}`}
                                                        visible={value === CheckboxValue.INDETERMINATE}
                                                >
                                                        <Icon
                                                                disabled={disabled}
                                                                fill={activeFill}
                                                                iconStyle={IconStyle.ROUNDED}
                                                                name={IconName.INDETERMINATE_CHECK_BOX}
                                                                size={iconSize}
                                                                svgStyle={iconSvgStyle}
                                                                testID={`checkbox__iconIndeterminateCheckBox--${id}`}
                                                                type={IconType.FILLED}
                                                        />
                                                </IconLayout>
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
