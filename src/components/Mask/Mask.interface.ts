import {View} from 'react-native'
import {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {LayoutAnimatedProps} from '../Layout-animated'
import {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
        backgroundColor?: string
        ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
        stateEvent: StateEvent
}

export interface MaskBaseProps extends MaskProps {
        render: (props: RenderMaskProps) => React.JSX.Element
}

export type MaskContainerProps = Pick<MaskProps, 'backgroundColor' | 'visible'>

export interface HandleMaskStateChangeOptions extends HandleStateEventChangeOptions {
        ref: React.RefObject<View>
}
