import {RefObject} from 'react'
import {View} from 'react-native'
import {OnStateEvent, OnStateEventChangedOptions} from '../../hooks'
import {LayoutAnimatedProps} from '../Layout-animated'
import {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
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
export interface HandleMaskStateChangedOptions extends OnStateEventChangedOptions {
        maskRef: RefObject<View>
}

export type MaskContentProps = {
        enableFocusRing: boolean
}
