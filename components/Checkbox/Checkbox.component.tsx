import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {PressableType} from '../Touchable'
import {CheckboxBase} from './Checkbox-base.component'
import type {CheckboxProps} from './Checkbox.interface'

const CheckboxWithRef = forwardRef<PressableType, CheckboxProps>((props, ref) => (
        <CheckboxBase
                {...props}
                ref={ref}
        />
))

CheckboxWithRef.displayName = 'CheckboxWithRef'

export const Checkbox = typedMemo(CheckboxWithRef)()
