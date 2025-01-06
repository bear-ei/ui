import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import {MaskProps, RenderMaskProps} from './Mask.interface'
import {Container, Content} from './Mask.styles'

const render = ({id, ref, testID, onStateEvent, ...containerProps}: RenderMaskProps) => (
        <Container
                {...containerProps}
                {...onStateEvent}
                accessibilityRole='alert'
                ref={ref}
                testID={testID ?? `mask--${id}`}
        >
                <Content testID={`mask_content--${id}`} />
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
