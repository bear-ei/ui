import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {PressableType} from '../Touchable'
import {FABBase} from './FAB-base.component'
import type {FABProps} from './FAB.interface'

const FABWithRef = forwardRef<PressableType, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
	/>
))

FABWithRef.displayName = 'FABWithRef'

export const Fab = typedMemo(FABWithRef)()
