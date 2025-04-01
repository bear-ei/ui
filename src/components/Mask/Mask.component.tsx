import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import {MaskProps, RenderMaskProps} from './Mask.interface'
import {ContainerLayout, Content} from './Mask.styles'

const render = ({ref, stateOnEvent, id, testID, ...containerProps}: RenderMaskProps) => (
        <ContainerLayout
                {...containerProps}
                accessibilityRole='alert'
                testID={testID ?? `mask--${id}`}
        >
                <Content
                        {...stateOnEvent}
                        ref={ref}
                        testID={`mask__content--${id}`}
                />
        </ContainerLayout>
)

const ForwardRefMask = forwardRef<View, MaskProps>((props, ref) => (
        <MaskBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Mask = ForwardRefMask as FC<MaskProps>
