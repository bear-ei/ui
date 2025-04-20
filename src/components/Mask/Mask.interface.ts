import type {View} from 'react-native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../hooks'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
	backgroundColor?: string
	ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
	interactionHandlers: InteractionHandlers
}

export interface MaskBaseProps extends MaskProps {
	renderMask: (props: RenderMaskProps) => React.JSX.Element
}

export type MaskContainerProps = Pick<MaskProps, 'backgroundColor' | 'visible'>
export interface HandleMaskStateChangeOptions extends HandleStateEventChangeOptions {
	ref: React.RefObject<View>
}
