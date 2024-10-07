import {ForwardedRef, forwardRef} from 'react'
import {ScrollView as RNScrollView, StyleProp, ViewStyle} from 'react-native'
import {VirtualListBase} from './Virtual-list-base.component'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {Container, Content, EmptyContent, LoadingContent, ScrollView, Supporting} from './Virtual-list.style'

const render = <T,>({
    contentContainerStyle,
    contentSize,
    contentVisible,
    id,
    itemElements,
    listEmptyComponent,
    loading,
    listLoadingComponent,
    onContentVisible,
    onStateEvent,
    scrollEventThrottle = 50,
    ...containerProps
}: RenderVirtualListProps<T>) => {
    const defaultContentContainerStyle = {flex: 1, minHeight: contentSize} as StyleProp<ViewStyle>
    const {onLayout} = onStateEvent
    const isLoading = typeof loading === 'boolean' && loading

    return (
        <Container testID={`virtualList--${id}`}>
            <ScrollView
                {...containerProps}
                contentContainerStyle={[contentContainerStyle, defaultContentContainerStyle]}
                onLayout={onLayout}
                scrollEventThrottle={scrollEventThrottle}
                testID={`virtualList__scrollView--${id}`}
            >
                <Content
                    onVisible={onContentVisible}
                    testID={`virtualList__content--${id}`}
                    visible={isLoading ? !isLoading : contentVisible}
                >
                    {itemElements}
                </Content>
            </ScrollView>

            <EmptyContent
                testID={`virtualList__emptyComponent--${id}`}
                unmount={true}
                visible={isLoading ? !isLoading : !contentVisible}
            >
                {listEmptyComponent ?? (
                    <Supporting
                        testID={`virtualList__supportingText--${id}`}
                        type='body'
                        size='medium'
                    >
                        No data
                    </Supporting>
                )}
            </EmptyContent>

            <LoadingContent
                testID={`virtualList__content--${id}`}
                unmount={true}
                visible={loading}
            >
                {listLoadingComponent ?? (
                    <Supporting
                        testID={`virtualList__supportingText--${id}`}
                        type='body'
                        size='medium'
                    >
                        Loading...
                    </Supporting>
                )}
            </LoadingContent>
        </Container>
    )
}

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: ForwardedRef<RNScrollView>) => (
    <VirtualListBase
        {...props}
        ref={ref}
        render={render}
    />
)

const ForwardRefList = forwardRef(VirtualListInner) as typeof VirtualListInner

export const VirtualList = ForwardRefList
