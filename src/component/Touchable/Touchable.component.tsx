import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TouchableBase} from './Touchable-base.component'
import {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Content, Main, RippleContainer} from './Touchable.style'

const render = ({
    backgroundUnderlay,
    children,
    elevationUnderlay,
    horizontalStretch,
    id,
    onStateEvent,
    rippleElements,
    shape,
    ...contentProps
}: RenderTouchableProps) => {
    const {onLayout, ...onPressableEvent} = onStateEvent

    return (
        <Container testID={`touchable--${id}`}>
            <Content
                {...contentProps}
                {...onPressableEvent}
                testID={`touchable__content--${id}`}
            >
                <Main
                    horizontalStretch={horizontalStretch}
                    onLayout={onLayout}
                    shape={shape}
                    testID={`touchable__main--${id}`}
                >
                    {children}
                    <RippleContainer
                        shape={shape}
                        testID={`touchable__main--${id}`}
                    >
                        {rippleElements}
                    </RippleContainer>

                    {backgroundUnderlay}
                    {elevationUnderlay}
                </Main>
            </Content>
        </Container>
    )
}

const ForwardRefTouchable = forwardRef<View, TouchableProps>((props, ref) => (
    <TouchableBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Touchable: FC<TouchableProps> = ForwardRefTouchable
