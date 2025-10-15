import type {ListProps} from '@/components/List'
import type {LayoutRectangle} from '@/constants'
import type {AnimatedTiming} from '@/hooks'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'

export interface SearchListProps extends ListProps {
        containerLayout: LayoutRectangle
        visible?: boolean
}

export interface RenderSearchListProps extends SearchListProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface SearchListBaseProps extends SearchListProps {
        renderSearchList: (props: RenderSearchListProps) => React.JSX.Element
}

export type HandleSearchListEmitOptions = Pick<RenderSearchListProps, 'visible' | 'id'>
export type UseSearchListAnimatedOptions = Pick<RenderSearchListProps, 'visible' | 'containerLayout'>
export interface HandleSearchListAnimatedTimingOptions extends Omit<UseSearchListAnimatedOptions, 'containerLayout'> {
        animatedTiming: AnimatedTiming
        heightSharedValue: SharedValue<number>
}
