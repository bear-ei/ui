import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {PROGRESS_TYPE} from './Progress.enum'
import type {ProgressBaseProps} from './Progress.interface'
import {RenderProgress} from './Progress.render'

export const ProgressBase = forwardRef<View, ProgressBaseProps>(
    ({type = PROGRESS_TYPE.LINEAR, ...renderProgressProps}, ref) => {
        const id = useId()

        return (
            <RenderProgress
                {...renderProgressProps}
                id={id}
                ref={ref}
                type={type}
            />
        )
    }
)

ProgressBase.displayName = 'ProgressBase'
