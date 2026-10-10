import type {View} from 'react-native'
import type {InteractionHandlers} from '../../hooks'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {TouchableProps} from '../Touchable'

export interface MaskProps
	extends Omit<LayoutAnimatedProps, 'ref'>, Pick<TouchableProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
	backgroundColor?: string
	opacity?: number
	ref?: React.ForwardedRef<View>
}

export interface RenderMaskProps extends MaskProps {
	interactionHandlers: InteractionHandlers
}

export type MaskBaseProps = MaskProps
