import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import {MaskProps, RenderMaskProps} from './Mask.interface'
import {Container, Content} from './Mask.styles'

const render = ({id, ref, onStateEvent, testID, ...containerProps}: RenderMaskProps) => (
        <Container
                {...containerProps}
                opacity={0.32}
                testID={testID ?? `mask--${id}`}
        >
                <Content
                        {...onStateEvent}
                        ref={ref}
                        testID={`mask_content--${id}`}
                />
        </Container>
)

const ForwardRefMask = forwardRef<View, MaskProps>((props, ref) => (
        <MaskBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Mask = ForwardRefMask as FC<MaskProps>
