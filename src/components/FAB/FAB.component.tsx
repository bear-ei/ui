import {ShapeType, Size, TypographyType} from '@bearei/material-token'
import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FABBase} from './FAB-base.component'
import {FABProps, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconLayout, LabelText, Main} from './FAB.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        accessibilityLabel,
        backgroundUnderlayAnimatedStyle,
        density,
        disabled,
        elevation,
        eventName,
        extendedFAB,
        icon,
        id,
        labelText,
        labelTextAnimatedStyle,
        ref,
        size,
        stateOnEvent,
        testID,
        type,
        underlayColor,
        ...contentProps
}: RenderFABProps) => {
        const sizeShape = size === Size.MEDIUM ? ShapeType.LARGE : ShapeType.MEDIUM
        const shape = size === Size.LARGE ? ShapeType.EXTRA_LARGE : sizeShape

        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                        testID={`fab__animatedBackgroundUnderlay--${id}`}
                />
        )

        const elevationUnderlayElement = (
                <Elevation
                        level={elevation}
                        shape={shape}
                        testID={`fab__elevation--${id}`}
                />
        )

        return (
                <Container
                        density={density}
                        extendedFAB={extendedFAB}
                        size={size}
                        testID={testID ?? `fab--${id}`}
                >
                        <Touchable
                                {...stateOnEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                mainAlignSelf={size === Size.SMALL ? 'center' : 'stretch'}
                                ref={ref}
                                shape={shape}
                                testID={`fab__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText ?? accessibilityLabel}
                                        accessibilityRole='button'
                                        density={density}
                                        extendedFAB={extendedFAB}
                                        pointerEvents='none'
                                        size={size}
                                        testID={`fab__content--${id}`}
                                        type={type}
                                >
                                        <Main
                                                extendedFAB={extendedFAB}
                                                size={size}
                                                testID={`fab__main--${id}`}
                                                type={type}
                                        >
                                                {icon && (
                                                        <IconLayout testID={`fab__iconLayout--${id}`}>
                                                                {icon}
                                                        </IconLayout>
                                                )}

                                                {extendedFAB && labelText && (
                                                        <AnimatedLabelText
                                                                size={Size.LARGE}
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`fab__animatedLabelText--${id}`}
                                                                type={TypographyType.LABEL}
                                                        >
                                                                {labelText}
                                                        </AnimatedLabelText>
                                                )}
                                        </Main>

                                        <Underlay
                                                eventName={eventName}
                                                shape={shape}
                                                testID={`fab__underlay--${id}`}
                                                underlayColor={underlayColor}
                                        />
                                </Content>
                        </Touchable>
                </Container>
        )
}

const ForwardRefFAB = forwardRef<View, FABProps>((props, ref) => (
        <FABBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const FAB: FC<FABProps> = ForwardRefFAB
