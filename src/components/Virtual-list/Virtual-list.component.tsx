import {ForwardedRef, forwardRef} from 'react'
import {ScrollView, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {
        Container,
        ContentLayoutAnimated,
        EmptyContentLayoutAnimated,
        LoadingContentLayoutAnimated,
        Supporting
} from './Virtual-list.styles'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
const render = <T,>({
        contentContainerStyle,
        contentSize = 0,
        emptyComponent,
        emptyList,
        id,
        itemElements,
        loading,
        loadingComponent,
        onStateEvent,
        scrollEventThrottle = 50,
        status,
        testID,

        ...containerProps
}: RenderVirtualListProps<T>) => {
        const {onLayout} = onStateEvent
        const defaultContentContainerStyle = {
                flex: 1,
                height: contentSize,
                minHeight: contentSize,
                position: 'relative'
        } as ViewStyle

        const contentStyle = {
                height: contentSize,
                minHeight: contentSize,
                position: 'relative'
        } as ViewStyle

        return (
                <Container
                        testID={testID ?? `virtualList--${id}`}
                        onLayout={onLayout}
                >
                        <AnimatedScrollView
                                {...containerProps}
                                contentContainerStyle={[contentContainerStyle, defaultContentContainerStyle]}
                                scrollEventThrottle={scrollEventThrottle}
                                testID={`virtualList__animatedScrollView--${id}`}
                        >
                                <ContentLayoutAnimated
                                        contentStyle={contentStyle}
                                        testID={`virtualList__contentLayoutAnimated--${id}`}
                                        visible={!loading && !emptyList && typeof emptyList === 'boolean'}
                                >
                                        {itemElements}
                                </ContentLayoutAnimated>

                                <EmptyContentLayoutAnimated
                                        lazy={true}
                                        testID={`virtualList__emptyContentLayoutAnimated--${id}`}
                                        visible={!loading && emptyList && status === 'succeeded'}
                                >
                                        {emptyComponent ?? (
                                                <Supporting
                                                        size='medium'
                                                        testID={`virtualList__supporting--${id}`}
                                                        type='body'
                                                >
                                                        No data
                                                </Supporting>
                                        )}
                                </EmptyContentLayoutAnimated>

                                <LoadingContentLayoutAnimated
                                        lazy={true}
                                        testID={`virtualList__loadingContentLayoutAnimated--${id}`}
                                        visible={loading && !!loadingComponent}
                                >
                                        {loadingComponent}
                                </LoadingContentLayoutAnimated>
                        </AnimatedScrollView>
                </Container>
        )
}

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: ForwardedRef<Animated.ScrollView>) => (
        <VirtualListBase
                {...props}
                ref={ref}
                render={render}
        />
)

const ForwardRefList = forwardRef(VirtualListInner) as typeof VirtualListInner

export const VirtualList = ForwardRefList
