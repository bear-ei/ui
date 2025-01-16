import {ForwardedRef, forwardRef} from 'react'
import {ScrollView, StyleProp, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {
        Container,
        Content,
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
        itemElements,
        loading,
        loadingComponent,
        onStateEvent,
        scrollEventThrottle = 50,
        status,
        ...containerProps
}: RenderVirtualListProps<T>) => {
        const {onLayout} = onStateEvent
        const defaultContentContainerStyle = {
                flex: 1,
                height: contentSize,
                minHeight: contentSize,
                position: 'relative'
        } as StyleProp<ViewStyle>

        return (
                <Container>
                        <AnimatedScrollView
                                {...containerProps}
                                contentContainerStyle={[contentContainerStyle, defaultContentContainerStyle]}
                                onLayout={onLayout}
                                scrollEventThrottle={scrollEventThrottle}
                        >
                                <ContentLayoutAnimated
                                        visible={!loading && !emptyList && typeof emptyList === 'boolean'}
                                >
                                        <Content>{itemElements}</Content>
                                </ContentLayoutAnimated>

                                <EmptyContentLayoutAnimated
                                        lazy={true}
                                        visible={!loading && emptyList && status === 'succeeded'}
                                >
                                        {emptyComponent ?? (
                                                <Supporting
                                                        size='medium'
                                                        type='body'
                                                >
                                                        No data
                                                </Supporting>
                                        )}
                                </EmptyContentLayoutAnimated>

                                <LoadingContentLayoutAnimated
                                        lazy={true}
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
