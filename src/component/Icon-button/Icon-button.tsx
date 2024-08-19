import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base'
import {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {Container, Content, ContentUnderlay, Main} from './Icon-button.style'

const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)

const render = ({
    active,
    activeColor,
    contentUnderlayAnimatedStyle,
    defaultActive,
    densityScale,
    disabled,
    eventName,
    icon,
    id,
    onStateEvent,
    type,
    underlayColor,
    ...contentProps
}: RenderIconButtonProps) => {
    const shape = 'full'
    const backgroundUnderlayElement = (
        <AnimatedContentUnderlay
            pointerEvents='none'
            shape={shape}
            style={[contentUnderlayAnimatedStyle]}
            testID={`button__contentUnderlay--${id}`}
        />
    )

    return (
        <Container
            testID={`iconButton--${id}`}
            densityScale={densityScale}
        >
            <Touchable
                {...onStateEvent}
                backgroundUnderlay={backgroundUnderlayElement}
                disabled={disabled}
                enableTouchableRipple={type !== 'active'}
                shape={shape}
                underlayColor={underlayColor}
            >
                <Content
                    {...contentProps}
                    accessibilityRole='button'
                    densityScale={densityScale}
                    pointerEvents='none'
                    shape={shape}
                    testID={`iconButton__content--${id}`}
                >
                    <Main testID={`iconButton__main--${id}`}>{icon}</Main>
                    <Underlay
                        active={active}
                        activeAnimatedType='scale'
                        activeColor={activeColor}
                        defaultActive={defaultActive}
                        eventName={eventName}
                        shape='full'
                        underlayColor={underlayColor}
                    />
                </Content>
            </Touchable>
        </Container>
    )
}

const ForwardRefIconButton = forwardRef<View, IconButtonProps>((props, ref) => (
    <IconButtonBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const IconButton: FC<IconButtonProps> = ForwardRefIconButton
