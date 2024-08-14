import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {Skeleton} from '../../Skeleton'
import {FormItemBase} from './Form-item-base'
import {FormItemProps, RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

const render = ({id, control, skeletonElement, minSkeletonDuration, ...containerProps}: RenderFormItemProps) => (
    <Container
        {...containerProps}
        testID={`formItem--${id}`}
    >
        <Skeleton
            content={skeletonElement}
            duration={minSkeletonDuration}
        >
            {control}
        </Skeleton>
    </Container>
)

const ForwardRefFormItem = forwardRef<View, FormItemProps>((props, ref) => (
    <FormItemBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const FormItem: FC<FormItemProps> = ForwardRefFormItem
