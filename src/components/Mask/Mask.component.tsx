import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import {MaskProps, RenderMaskProps} from './Mask.interface'
import {ContainerLayoutAnimated, Content} from './Mask.styles'

const render = ({ref, onStateEvent, ...containerProps}: RenderMaskProps) => (
        <ContainerLayoutAnimated
                {...containerProps}
                {...onStateEvent}
                accessibilityRole='alert'
                ref={ref}
        >
                <Content />
        </ContainerLayoutAnimated>
)

const ForwardRefMask = forwardRef<View, MaskProps>((props, ref) => (
        <MaskBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Mask = ForwardRefMask as FC<MaskProps>
