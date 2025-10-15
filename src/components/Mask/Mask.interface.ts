import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {View} from 'react-native'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
        backgroundColor?: string
        opacity?: number
        ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
        interactionHandlers: InteractionHandlers
}

export type MaskBaseProps = MaskProps
export interface HandleMaskStateChangeOptions extends HandleStateEventChangeOptions {
        ref: React.RefObject<View>
}
