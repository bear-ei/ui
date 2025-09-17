import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {DragBase} from './Drag-base.component'
import type {DragProps} from './Drag.interface'

const DragWithRef = forwardRef<View, DragProps>((props, ref) => (
	<DragBase
		{...props}
		ref={ref}
	/>
))

export const Drag = typedMemo(DragWithRef)()
