import {RefObject} from 'react'
import {View} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {LayoutAnimatedProps} from '../Layout-animated'

export interface MaskProps extends Omit<LayoutAnimatedProps, 'ref'> {
        backgroundColor?: string
        ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
        onStateEvent: OnStateEvent
}

export interface MaskBaseProps extends MaskProps {
        render: (props: RenderMaskProps) => React.JSX.Element
}

export type MaskContainerProps = Pick<MaskProps, 'backgroundColor' | 'visible'>
export interface HandleMaskStateChangeOptions extends OnStateEventChangeOptions {
        maskRef: RefObject<View>
}
