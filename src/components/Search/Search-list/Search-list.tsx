import {FC, forwardRef} from 'react'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {List, ListData, VirtualListComponent} from '../../List'
import {SearchListBase} from './Search-list-base'
import {RenderSearchListProps, SearchListProps} from './Search-list.interface'
import {Container} from './Search-list.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({containerAnimatedStyle, containerLayout, id, ...listProps}: RenderSearchListProps) => (
    <AnimatedContainer
        containerHeight={containerLayout.height}
        containerPageX={containerLayout.pageX}
        containerPageY={containerLayout.pageY}
        shape='extraLarge'
        style={[containerAnimatedStyle]}
        testID={`search__list--${id}`}
        width={containerLayout.width}
    >
        <Divider
            horizontalStretch={true}
            size='large'
        />

        <List {...listProps} />
    </AnimatedContainer>
)

const ForwardRefSearch = forwardRef<VirtualListComponent<ListData>, SearchListProps>((props, ref) => (
    <SearchListBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const SearchList = ForwardRefSearch as FC<SearchListProps>
