import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TouchableBase} from './Touchable-base'
import {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Content, Main} from './Touchable.style'

const render = ({
    backgroundUnderlay,
    children,
    elevationUnderlay,
    id,
    onStateEvent,
    rippleElements,
    shape,
    horizontalStretch,
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
                    onLayout={onLayout}
                    shape={shape}
                    testID={`touchable__main--${id}`}
                    horizontalStretch={horizontalStretch}
                >
                    {children}
                    {rippleElements}
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
