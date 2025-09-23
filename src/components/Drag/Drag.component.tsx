import {forwardRef} from 'react'
import {typedMemo} from '../../utils'
import {DragBase} from './Drag-base.component'
import type {DragProps, DragRef} from './Drag.interface'

const DragWithRef = forwardRef<DragRef, DragProps>((props, ref) => (
	<DragBase
		{...props}
		ref={ref}
	/>
))

export const Drag = typedMemo(DragWithRef)()
