import {View} from 'react-native'
import {LayoutAnimatedProps} from '../Layout-animated'
import {TouchableProps} from '../Touchable'

export interface MaskProps extends Omit<LayoutAnimatedProps & TouchableProps, 'ref'> {
        backgroundColor?: string
        ref?: React.ForwardedRef<View>
}

export type RenderMaskProps = MaskProps
export interface MaskBaseProps extends MaskProps {
        render: (props: RenderMaskProps) => React.JSX.Element
}

export type MaskContainerProps = Pick<MaskProps, 'backgroundColor' | 'visible'>
