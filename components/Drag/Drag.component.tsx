import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {DragBase} from './Drag-base.component'
import type {DragProps, DragRef} from './Drag.interface'

const DragWithRef = forwardRef<DragRef, DragProps>((props, ref) => (
        <DragBase
                {...props}
                ref={ref}
        />
))

DragWithRef.displayName = 'DragWithRef'

export const Drag = typedMemo(DragWithRef)()
