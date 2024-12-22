import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import {MaskProps, RenderMaskProps} from './Mask.interface'
import {Container, Content} from './Mask.styles'

const render = ({id, ref, onStateEvent, testID, ...containerProps}: RenderMaskProps) => (
        <Container
                {...containerProps}
                accessibilityRole='alert'
                testID={testID ?? `mask--${id}`}
        >
                <Content
                        {...onStateEvent}
                        enableFocusRing={false}
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
