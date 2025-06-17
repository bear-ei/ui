import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../../utils'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import type {ListAffordanceButtonProps} from './List-affordance-button.interface'

const ListAffordanceButtonWithRef = forwardRef<typeof Pressable, ListAffordanceButtonProps>((props, ref) => (
	<ListAffordanceButtonBase
		{...props}
		ref={ref}
	/>
))

export const ListAffordanceButton = typedMemo(ListAffordanceButtonWithRef)()
