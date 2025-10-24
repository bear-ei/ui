import type {TextStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {LayoutAnimatedProps} from '../Layout-animated'

export interface SupportingTextProps extends LayoutAnimatedProps {
        disabled?: boolean
        error?: boolean
}

export type SupportingTextBaseProps = SupportingTextProps
export interface RenderSupportingTextProps extends SupportingTextProps {
        textAnimatedStyle: AnimatedStyle<TextStyle>
}

export interface UseSupportingTextOptions extends Pick<SupportingTextProps, 'disabled' | 'error'> {}
