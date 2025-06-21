import type {ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {AnimatedTiming} from '../../../hooks'
import type {LayoutRectangle} from '../../Common'
import type {ListProps} from '../../List'

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

export type SearchListContainerProps = {
	containerHeight?: number
	containerPageX?: number
	containerPageY?: number
	size?: number
}
