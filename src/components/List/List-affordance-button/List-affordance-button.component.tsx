import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import type {ListAffordanceButtonProps} from './List-affordance-button.interface'
import {renderListAffordanceButton} from './List-affordance-button.render'

const ListAffordanceButtonWithRef = forwardRef<View, ListAffordanceButtonProps>((props, ref) => (
	<ListAffordanceButtonBase
		{...props}
		ref={ref}
		renderListAffordanceButton={renderListAffordanceButton}
	/>
))

export const ListAffordanceButton = typedMemo(ListAffordanceButtonWithRef)()
