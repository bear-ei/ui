import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TouchableBase} from './Touchable-base.component'
import {RenderTouchableProps, TouchableProps} from './Touchable.interface'
import {Container, Main, RippleContainer, TouchableContent} from './Touchable.styles'

const render = ({
        backgroundUnderlay,
        children,
        elevationUnderlay,
        mainAlignSelf,
        onStateEvent,
        rippleElements,
        shape,
        ...contentProps
}: RenderTouchableProps) => (
        <Container>
                <TouchableContent
                        {...contentProps}
                        {...onStateEvent}
                        enableFocusRing={false}
                >
                        <Main
                                alignSelf={mainAlignSelf}
                                shape={shape}
                        >
                                {children}
                                <RippleContainer shape={shape}>{rippleElements}</RippleContainer>
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
