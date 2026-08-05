import type {PressableType} from '@/components/Touchable'
import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import type {ListAffordanceButtonProps} from './List-affordance-button.interface'

const ListAffordanceButtonWithRef = forwardRef<PressableType, ListAffordanceButtonProps>((props, ref) => (
    <ListAffordanceButtonBase
        {...props}
        ref={ref}
    />
))

ListAffordanceButtonWithRef.displayName = 'ListAffordanceButtonWithRef'

export const ListAffordanceButton = typedMemo(ListAffordanceButtonWithRef)()
