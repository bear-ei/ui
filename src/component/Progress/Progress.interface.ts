import {RefAttributes} from 'react'
import {LayoutRectangle, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {ProgressActiveIndicatorProps} from './Progress-active-indicator'

type ProgressType = 'linear' | 'circular'
type ProgressAnimated = 'determinate' | 'indeterminate'

export interface ProgressProps
    extends ViewProps,
        RefAttributes<View>,
        Pick<ProgressActiveIndicatorProps, 'increment' | 'defaultValue' | 'value'> {
    animated?: ProgressAnimated
    type?: ProgressType
}

export interface RenderProgressProps extends ProgressProps {
    layout: LayoutRectangle
    onStateEvent: OnStateEvent
}

export interface ProgressBaseProps extends ProgressProps {
    render: (props: RenderProgressProps) => React.JSX.Element
}

export interface ProgressState {
    layout: LayoutRectangle
}

export type HandleProgressStateChangeOptions = OnStateEventChangeOptions
export type ProgressContainerProps = {
    progress?: boolean
}
