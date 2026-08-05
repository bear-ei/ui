import type {Alignment} from '@/constants'
import type {TextStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {LayoutAnimatedProps} from '../Layout-animated'

export interface SupportingTextProps extends LayoutAnimatedProps {
    alignment?: Alignment
    disabled?: boolean
    error?: boolean
}

export type SupportingTextBaseProps = SupportingTextProps
export interface RenderSupportingTextProps extends SupportingTextProps {
    textAnimatedStyle: AnimatedStyle<TextStyle>
}

export type UseSupportingTextOptions = Pick<SupportingTextProps, 'disabled' | 'error'>
