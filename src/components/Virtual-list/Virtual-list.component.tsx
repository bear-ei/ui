import {ForwardedRef, forwardRef} from 'react'
import {ScrollView as RNScrollView, StyleProp, ViewStyle} from 'react-native'
import {VirtualListBase} from './Virtual-list-base.component'
import {
    RenderVirtualListProps,
    VirtualListProps
} from './Virtual-list.interface'
import {
    Container,
    Content,
    EmptyContent,
    LoadingContent,
    ScrollView,
    Supporting
} from './Virtual-list.styles'

const render = <T,>({
    contentContainerStyle,
    contentSize,
    contentVisible,
    id,
    itemElements,
    listEmptyComponent,
    listLoadingComponent,
    loading,
    onContentVisible,
    onStateEvent,
    scrollEventThrottle = 50,
    skeletonLoading,
    ...containerProps
}: RenderVirtualListProps<T>) => {
    const {onLayout} = onStateEvent
    const defaultContentContainerStyle = {
        flex: 1,
        minHeight: contentSize
    } as StyleProp<ViewStyle>

    const listContentVisible = loading ? !loading : contentVisible

    return (
        <Container testID={`virtualList--${id}`}>
            <ScrollView
                {...containerProps}
                contentContainerStyle={[
                    contentContainerStyle,
                    defaultContentContainerStyle
                ]}
                onLayout={onLayout}
                scrollEventThrottle={scrollEventThrottle}
                testID={`virtualList__scrollView--${id}`}
            >
                <Content
                    onVisible={onContentVisible}
                    testID={`virtualList__content--${id}`}
                    visible={skeletonLoading || listContentVisible}
                >
                    {itemElements}
                </Content>
            </ScrollView>

            <EmptyContent
                testID={`virtualList__emptyComponent--${id}`}
                unmount={true}
                visible={loading || skeletonLoading ? false : !contentVisible}
            >
                {listEmptyComponent ?? (
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
                testID={`virtualList__content--${id}`}
                unmount={true}
                visible={loading && !!listLoadingComponent}
            >
                {listLoadingComponent}
            </LoadingContent>
        </Container>
    )
}

const VirtualListInner = <T,>(
    props: VirtualListProps<T>,
    ref: ForwardedRef<RNScrollView>
) => (
    <VirtualListBase
        {...props}
        ref={ref}
        render={render}
    />
)

const ForwardRefList = forwardRef(VirtualListInner) as typeof VirtualListInner

export const VirtualList = ForwardRefList
