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
        mainAlignSelf,
        onStateEvent,
        rippleElements,
        shape,
        testID,
        ...contentProps
}: RenderTouchableProps) => (
        <Container testID={testID ?? `touchable--${id}`}>
                <TouchableContent
                        {...contentProps}
                        {...onStateEvent}
                        enableFocusRing={false}
                        testID={`touchable__content--${id}`}
                >
                        <Main
                                alignSelf={mainAlignSelf}
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

const ForwardRefTouchable = forwardRef<View, TouchableProps>((props, ref) => (
        <TouchableBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Touchable: FC<TouchableProps> = ForwardRefTouchable
