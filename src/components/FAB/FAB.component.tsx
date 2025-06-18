import {forwardRef} from 'react'
import {typedMemo} from '../../utils'
import type {PressableType} from '../Touchable'
import {FABBase} from './FAB-base.component'
import type {FABProps} from './FAB.interface'

const FABWithRef = forwardRef<PressableType, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
	/>
))

export const Fab = typedMemo(FABWithRef)()
