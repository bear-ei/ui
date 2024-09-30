import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {StepItemProps} from './Step-item'

export type StepType = 'segment' | 'block'
export interface StepData extends Pick<StepItemProps, 'icon' | 'labelText' | 'disabled' | 'finished'> {
    indexKey: string
}

export type RenderStepItemOptions = Omit<StepItemProps, 'itemKey'>
export interface StepProps
    extends Pick<StepItemProps, 'activeKey' | 'onActive' | 'type' | 'densityScale'>,
        ViewProps,
        RefAttributes<View> {
    data?: StepData[]
    defaultActiveKey?: string
}

export interface RenderStepProps extends StepProps {
    fabElement?: JSX.Element
    stepItemElements?: JSX.Element[]
    onActiveSource?: (value?: string) => void
}

export interface StepBaseProps extends StepProps {
    render: (props: RenderStepProps) => JSX.Element
}

export interface StepState {
    nextActiveEvent?: () => void
    stepActiveKey?: string
}

export type HandleStepActiveOptions = Pick<RenderStepProps, 'onActive' | 'activeKey'>
