import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ButtonBase} from './Button-base'
import {ButtonProps, RenderButtonProps} from './Button.interface'
import {Container, Content, ContentUnderlay, IconContainer, LabelText, Main} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const render = ({
    contentUnderlayAnimatedStyle,
    densityScale,
    disabled,
    elevation,
    eventName,
    horizontalStretch,
    icon,
    id,
    labelText,
    labelTextAnimatedStyle,
    loading,
    onStateEvent,
    type = 'filled',
    underlayColor,
    ...contentProps
}: RenderButtonProps) => {
    const link = type === 'link'
    const shape = link ? 'extraSmallTop' : 'full'
    const backgroundUnderlayElement = (
        <AnimatedContentUnderlay
            pointerEvents='none'
            shape={shape}
            style={[contentUnderlayAnimatedStyle]}
            testID={`button__contentUnderlay--${id}`}
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
            horizontalStretch={horizontalStretch}
            testID={`button--${id}`}
            type={type}
        >
            <Touchable
                {...onStateEvent}
                backgroundUnderlay={backgroundUnderlayElement}
                disabled={loading || disabled}
                elevationUnderlay={elevationUnderlayElement}
                horizontalStretch={horizontalStretch}
                shape={shape}
                underlayColor={underlayColor}
            >
                <Content
                    {...contentProps}
                    accessibilityLabel={labelText}
                    accessibilityRole='button'
                    densityScale={densityScale}
                    pointerEvents='none'
                    shape={shape}
                    testID={`button__content--${id}`}
                    type={type}
                >
                    <Main
                        iconShow={!!icon}
                        testID={`button__main--${id}`}
                        type={type}
                    >
                        {icon && !link && <IconContainer testID={`button__iconContainer--${id}`}>{icon}</IconContainer>}

                        <AnimatedLabelText
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            size={link ? 'small' : 'large'}
                            style={[labelTextAnimatedStyle]}
                            testID={`button__labelText--${id}`}
                            type={link ? 'body' : 'label'}
                        >
                            {labelText}
                        </AnimatedLabelText>
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

const ForwardRefButton = forwardRef<View, ButtonProps>((props, ref) => (
    <ButtonBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Button: FC<ButtonProps> = ForwardRefButton
