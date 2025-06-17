import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../utils'
import {FABBase} from './FAB-base.component'
import type {FABProps} from './FAB.interface'

const FABWithRef = forwardRef<typeof Pressable, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
	/>
))

export const Fab = typedMemo(FABWithRef)()
