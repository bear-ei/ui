import type {ListAffordanceButtonProps} from './List-affordance-button.interface'

import {typedMemo} from '../../../utils'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'

export const ListAffordanceButton = typedMemo((props: ListAffordanceButtonProps) => (
	<ListAffordanceButtonBase {...props} />
))
