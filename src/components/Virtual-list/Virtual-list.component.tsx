import {ForwardedRef, forwardRef} from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {Container, Content, EmptyContent, LoadingContent, Supporting} from './Virtual-list.styles'

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
                        <Animated.ScrollView
                                {...containerProps}
                                contentContainerStyle={[contentContainerStyle, defaultContentContainerStyle]}
                                onLayout={onLayout}
                                scrollEventThrottle={scrollEventThrottle}
                        >
                                <Content visible={!loading && !emptyList && typeof emptyList === 'boolean'}>
                                        {itemElements}
                                </Content>

                                <EmptyContent
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
                                </EmptyContent>

                                <LoadingContent
                                        lazy={true}
                                        visible={loading && !!loadingComponent}
                                >
                                        {loadingComponent}
                                </LoadingContent>
                        </Animated.ScrollView>
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
