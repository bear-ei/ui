import {FC, forwardRef} from 'react'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {List, ListData, VirtualListComponent} from '../../List'
import {SearchListBase} from './Search-list-base.component'
import {RenderSearchListProps, SearchListProps} from './Search-list.interface'
import {Container} from './Search-list.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({containerAnimatedStyle, containerLayout, id, testID, ...listProps}: RenderSearchListProps) => (
        <AnimatedContainer
                containerHeight={containerLayout.height}
                containerPageX={containerLayout.pageX}
                containerPageY={containerLayout.pageY}
                shape='extraLarge'
                size={containerLayout.width}
                style={[containerAnimatedStyle]}
                testID={testID ?? `searchList--${id}`}
        >
                <Divider
                        size='large'
                        testID={testID ?? `searchList__divider--${id}`}
                />

                <List
                        {...listProps}
                        testID={testID ?? `searchList__list--${id}`}
                />
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
