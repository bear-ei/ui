import {View} from 'react-native'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {LayoutAnimatedProps} from '../Layout-animated'
import {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
        backgroundColor?: string
        ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
        stateOnEvent: StateOnEvent
}

export interface MaskBaseProps extends MaskProps {
        render: (props: RenderMaskProps) => React.JSX.Element
}

export type MaskContainerProps = Pick<MaskProps, 'backgroundColor' | 'visible'>
export interface HandleMaskStateChangeOptions extends HandleStateEventChangeOptions {
        ref: React.RefObject<View>
}
