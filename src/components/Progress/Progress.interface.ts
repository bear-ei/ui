import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangedOptions} from '../../hooks'
import {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear'

export type ProgressType = 'linear' | 'circular'
export type ProgressAnimated = 'determinate' | 'indeterminate'
export interface ProgressProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<ProgressActiveIndicatorLinearProps, 'increment' | 'defaultValue' | 'value'> {
        animated?: ProgressAnimated
        content?: JSX.Element
        height?: number
        type?: ProgressType
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

export interface HandleProgressStateChangedOptions extends OnStateEventChangedOptions {
        onLayoutChanged: (layout: LayoutRectangle) => void
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type' | 'width' | 'height'> {
        progressing?: boolean
}
