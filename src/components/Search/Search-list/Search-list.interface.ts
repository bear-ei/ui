import type {ListProps} from '@/components/List'
import type {LayoutRectangle} from '@/constants'
import type {SharedValue} from 'react-native-reanimated'

export interface SearchListProps extends ListProps {
        containerLayout?: LayoutRectangle
        onVisibility?: (visible?: boolean) => void
        visible?: boolean
}

export interface RenderSearchListProps extends Omit<SearchListProps, 'containerLayout'> {
        containerLayout: LayoutRectangle
}

export type SearchListBaseProps = SearchListProps
export interface AnimateSearchBorderRadiusOptions extends SearchListProps {
        borderBottomRadiusSharedValue: SharedValue<number>
        borderTopRadiusSharedValue: SharedValue<number>
}
