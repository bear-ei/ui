import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {ProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear'

export type ProgressType = 'linear' | 'circular'
export type ProgressAnimated = 'determinate' | 'indeterminate'
export interface ProgressProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<ProgressActiveIndicatorLinearProps, 'increment' | 'defaultValue' | 'value'> {
        animated?: ProgressAnimated
        type?: ProgressType
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
        onLayoutChanged: (layout: LayoutRectangle) => void
}

export interface ProgressContainerProps extends Pick<ProgressProps, 'type'> {
        progressing?: boolean
}

export type ProgressTrackProps = Pick<ProgressProps, 'type'>
