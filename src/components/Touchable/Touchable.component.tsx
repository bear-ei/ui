import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TouchableBase} from './Touchable-base.component'
import {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Main, RippleContainer, TouchableContent} from './Touchable.styles'

const render = ({
    backgroundUnderlay,
    children,
    elevationUnderlay,
    id,
    onStateEvent,
    rippleElements,
    shape,
    mainAlignSelf,
    ...contentProps
}: RenderTouchableProps) => {
    const {onLayout, ...onPressableEvent} = onStateEvent

    return (
        <Container testID={`touchable--${id}`}>
            <TouchableContent
                {...contentProps}
                {...onPressableEvent}
                pointerEvents='box-only'
                testID={`touchable__content--${id}`}
            >
                <Main
                    alignSelf={mainAlignSelf}
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
            </TouchableContent>
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
