import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {FormItemBase} from './Form-item-base.component'
import {FormItemProps, RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

const render = ({control, ...containerProps}: RenderFormItemProps) => (
        <Container {...containerProps}>{control}</Container>
)

const ForwardRefFormItem = forwardRef<View, FormItemProps>((props, ref) => (
        <FormItemBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const FormItem: FC<FormItemProps> = ForwardRefFormItem
