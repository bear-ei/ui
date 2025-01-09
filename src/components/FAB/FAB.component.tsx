import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FABBase} from './FAB-base.component'
import {FABProps, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconContainer, LabelText, Main} from './FAB.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        accessibilityLabel,
        backgroundUnderlayAnimatedStyle,
        disabled,
        elevation,
        eventName,
        extendedFAB,
        icon,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        ref,
        size,
        type,
        underlayColor,
        ...contentProps
}: RenderFABProps) => {
        const sizeShape = size === 'medium' ? 'large' : 'medium'
        const shape = size === 'large' ? 'extraLarge' : sizeShape
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                />
        )

        const elevationUnderlayElement = (
                <Elevation
                        level={elevation}
                        shape={shape}
                />
        )

        return (
                <Container
                        extendedFAB={extendedFAB}
                        size={size}
                >
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                mainAlignSelf={size === 'small' ? 'center' : 'stretch'}
                                ref={ref}
                                shape={shape}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText ?? accessibilityLabel}
                                        accessibilityRole='button'
                                        extendedFAB={extendedFAB}
                                        pointerEvents='none'
                                        size={size}
                                        type={type}
                                >
                                        <Main
                                                extendedFAB={extendedFAB}
                                                size={size}
                                                type={type}
                                        >
                                                {icon && <IconContainer>{icon}</IconContainer>}

                                                {extendedFAB && labelText && (
                                                        <AnimatedLabelText
                                                                size='large'
                                                                style={[labelTextAnimatedStyle]}
                                                                type='label'
                                                        >
                                                                {labelText}
                                                        </AnimatedLabelText>
                                                )}
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

const ForwardRefFAB = forwardRef<View, FABProps>((props, ref) => (
        <FABBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const FAB: FC<FABProps> = ForwardRefFAB
