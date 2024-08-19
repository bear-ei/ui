import {ForwardedRef, forwardRef} from 'react'
import {ScrollView as RNScrollView, StyleProp, ViewStyle} from 'react-native'
import {VirtualListBase} from './Virtual-list-base'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {Container, Content, EmptyComponent, ScrollView} from './Virtual-list.style'

const render = <T,>({
    contentContainerStyle,
    contentSize,
    contentVisible,
    id,
    itemElements,
    listEmptyComponent,
    onContentVisible,
    onStateEvent,
    scrollEventThrottle = 50,
    ...containerProps
}: RenderVirtualListProps<T>) => {
    const defaultContentContainerStyle = {flex: 1, minHeight: contentSize} as StyleProp<ViewStyle>
    const {onLayout} = onStateEvent

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
                    visible={contentVisible}
                >
                    {itemElements}
                </Content>
            </ScrollView>

            <EmptyComponent
                testID={`virtualList__content--${id}`}
                unmount={true}
                visible={!contentVisible}
            >
                {listEmptyComponent}
            </EmptyComponent>
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
