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
        id,
        itemElements,
        loading,
        loadingComponent,
        onStateEvent,
        scrollEventThrottle = 50,
        testID,
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
                <Container testID={`virtualList--${id}`}>
                        <Animated.ScrollView
                                {...containerProps}
                                contentContainerStyle={[contentContainerStyle, defaultContentContainerStyle]}
                                onLayout={onLayout}
                                scrollEventThrottle={scrollEventThrottle}
                                testID={testID ?? `virtualList__scrollView--${id}`}
                        >
                                <Content
                                        testID={`virtualList__content--${id}`}
                                        visible={!loading && !emptyList && typeof emptyList === 'boolean'}
                                >
                                        {itemElements}
                                </Content>

                                <EmptyContent
                                        lazy={true}
                                        testID={`virtualList__emptyComponent--${id}`}
                                        visible={!loading && emptyList && status === 'succeeded'}
                                >
                                        {emptyComponent ?? (
                                                <Supporting
                                                        size='medium'
                                                        testID={`virtualList__supportingText--${id}`}
                                                        type='body'
                                                >
                                                        No data
                                                </Supporting>
                                        )}
                                </EmptyContent>

                                <LoadingContent
                                        lazy={true}
                                        testID={`virtualList__content--${id}`}
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
