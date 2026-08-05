import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {PressableType} from '../Touchable'
import {ButtonBase} from './Button-base.component'
import type {ButtonProps} from './Button.interface'

const ButtonWithRef = forwardRef<PressableType, ButtonProps>((props, ref) => (
    <ButtonBase
        {...props}
        ref={ref}
    />
))

ButtonWithRef.displayName = 'ButtonWithRef'

export const Button = typedMemo(ButtonWithRef)()
