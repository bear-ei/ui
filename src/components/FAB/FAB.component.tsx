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
        disabled,
        elevation,
        eventName,
        extendedFAB,
        icon,
        id,
        labelText,
        labelTextAnimatedStyle,
        stateEvent,
        ref,
        size,
        testID,
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
                        extendedFAB={extendedFAB}
                        size={size}
                        testID={testID ?? `fab--${id}`}
                >
                        <Touchable
                                {...stateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                mainAlignSelf={size === 'small' ? 'center' : 'stretch'}
                                ref={ref}
                                shape={shape}
                                testID={`fab__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText ?? accessibilityLabel}
                                        accessibilityRole='button'
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
                                                                size='large'
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`fab__animatedLabelText--${id}`}
                                                                type='label'
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
