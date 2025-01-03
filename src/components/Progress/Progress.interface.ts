import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'

export type ProgressType = 'linear' | 'circular'
export type ProgressAnimated = 'determinate' | 'indeterminate'
export interface ProgressProps extends ViewProps, RefAttributes<View> {
        animatedType?: ProgressAnimated
        content?: JSX.Element
        defaultValue?: number
        height?: number
        increment?: number
        strokeWidth?: number
        type?: ProgressType
        value?: number
        width?: number
}

export interface RenderProgressProps extends ProgressProps {
        layout: LayoutRectangle
        onStateEvent: OnStateEvent
}

export interface ProgressBaseProps extends ProgressProps {
        render: (props: RenderProgressProps) => JSX.Element
}

export interface ProgressState {
        layout: LayoutRectangle
}

export interface HandleProgressStateChangeOptions extends OnStateEventChangeOptions {
        onLayoutChange: (layout: LayoutRectangle) => void
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'width' | 'height'> {
        progressing?: boolean
}
