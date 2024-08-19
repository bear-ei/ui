import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FABBase} from './FAB-base'
import {FABProps, RenderFABProps} from './FAB.interface'
import {Container, Content, ContentUnderlay, IconContainer, LabelText, Main} from './FAB.style'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const render = ({
    accessibilityLabel,
    contentUnderlayAnimatedStyle,
    densityScale,
    elevation,
    eventName,
    extendedFAB,
    icon,
    id,
    labelText,
    labelTextAnimatedStyle,
    onStateEvent,
    size,
    type,
    underlayColor,
    ...contentProps
}: RenderFABProps) => {
    const sizeShape = size === 'medium' ? 'large' : 'medium'
    const shape = size === 'large' ? 'extraLarge' : sizeShape
    const backgroundUnderlayElement = (
        <AnimatedContentUnderlay
            pointerEvents='none'
            shape={shape}
            style={[contentUnderlayAnimatedStyle]}
            testID={`fab__contentUnderlay--${id}`}
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
            densityScale={densityScale}
            extendedFAB={extendedFAB}
            size={size}
            testID={`fab--${id}`}
        >
            <Touchable
                {...onStateEvent}
                backgroundUnderlay={backgroundUnderlayElement}
                elevationUnderlay={elevationUnderlayElement}
                shape={shape}
                underlayColor={underlayColor}
            >
                <Content
                    {...contentProps}
                    accessibilityLabel={labelText ?? accessibilityLabel}
                    accessibilityRole='button'
                    densityScale={densityScale}
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
                        {icon && <IconContainer testID={`fab__iconContainer--${id}`}>{icon}</IconContainer>}
                        {extendedFAB && labelText && (
                            <AnimatedLabelText
                                size='large'
                                style={[labelTextAnimatedStyle]}
                                testID={`fab__labelText--${id}`}
                                type='label'
                            >
                                {labelText}
                            </AnimatedLabelText>
                        )}
                    </Main>

                    <Underlay
                        eventName={eventName}
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
