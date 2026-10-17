import type {InteractionHandlers} from '../../hooks'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'

export interface MaskProps extends LayoutAnimatedProps, Pick<TouchableProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
	backgroundColor?: string
	opacity?: number
}

export interface RenderMaskProps extends Omit<MaskProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
	interactionHandlers: InteractionHandlers
}

export type MaskBaseProps = MaskProps
