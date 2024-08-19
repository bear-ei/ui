import {LayoutRectangle, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hook'
import {ListProps} from '../../List'

export interface SearchListProps extends ListProps {
    containerLayout: LayoutRectangle & {pageX?: number; pageY?: number}
    visible?: boolean
}

export interface RenderSearchListProps extends SearchListProps {
    containerAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface SearchListBaseProps extends SearchListProps {
    render: (props: RenderSearchListProps) => React.JSX.Element
}

export type HandleSearchListEmitOptions = Pick<RenderSearchListProps, 'visible' | 'id'>
export type UseSearchListAnimatedOptions = Pick<RenderSearchListProps, 'visible' | 'containerLayout'>
export interface HandleSearchListAnimatedTimingOptions extends Omit<UseSearchListAnimatedOptions, 'containerLayout'> {
    heightSharedValue: SharedValue<AnimatableValue>
    animatedTiming: AnimatedTiming
}

export type SearchListContainerProps = {
    containerHeight?: number
    containerPageX?: number
    containerPageY?: number
    width?: number
}
