import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'

export type ProgressType = 'linear' | 'circular'
export type ProgressAnimated = 'determinate' | 'indeterminate'
export interface ProgressProps extends ViewProps, RefAttributes<View> {
        animatedType?: ProgressAnimated
        content?: React.JSX.Element
        defaultValue?: number
        increment?: number
        size?: number
        strokeWidth?: number
        type?: ProgressType
        value?: number
}

export interface RenderProgressProps extends ProgressProps {
        layout: LayoutRectangle
        stateOnEvent: StateOnEvent
}

export interface ProgressBaseProps extends ProgressProps {
        render: (props: RenderProgressProps) => React.JSX.Element
}

export interface ProgressState {
        layout: LayoutRectangle
}

export interface HandleProgressStateChangeOptions extends HandleStateEventChangeOptions {
        onLayoutChange: (layout: LayoutRectangle) => void
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'size'> {
        progressing?: boolean
}
