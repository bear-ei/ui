import {ForwardedRef, forwardRef} from 'react'
import {ScrollView, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import {RenderVirtualListProps, VirtualListProps} from './Virtual-list.interface'
import {
        Container,
        Content,
        ContentLayoutAnimated,
        EmptyContentLayoutAnimated,
        LoadingContentLayoutAnimated,
        SupportingText
} from './Virtual-list.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
const render = <T,>({
        contentAnimatedStyle,
        contentSize,
        emptyComponent,
        emptyList,
        id,
        itemElements,
        layout,
        loading,
        loadingComponent,
        stateEvent,
        scrollEventThrottle = 50,
        status,
        testID,
        ...containerProps
}: RenderVirtualListProps<T>) => {
        const {onLayout} = stateEvent
        const contentLayoutAnimatedStyle = {position: 'relative'} as ViewStyle
        const contentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
        const emptyContentVisible = !loading && emptyList && status === 'succeeded'
        const layoutCompleted = typeof layout?.height === 'number' && layout.height > 0
        const loadingVisible = loading
        const scrollViewContentStyle = {flex: 1, alignSelf: 'stretch', minHeight: contentSize} as ViewStyle
        const emptyContentLayoutAnimatedStyle = {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
        } as ViewStyle

        return (
                <Container
                        testID={testID ?? `virtualList--${id}`}
                        onLayout={onLayout}
                >
                        {layoutCompleted && (
                                <AnimatedScrollView
                                        {...containerProps}
                                        contentContainerStyle={scrollViewContentStyle}
                                        scrollEventThrottle={scrollEventThrottle}
                                        testID={`virtualList__animatedScrollView--${id}`}
                                >
                                        <AnimatedContent
                                                style={contentAnimatedStyle}
                                                testID={`virtualList__animatedContent--${id}`}
                                        >
                                                <ContentLayoutAnimated
                                                        contentStyle={contentLayoutAnimatedStyle}
                                                        testID={`virtualList__contentLayoutAnimated--${id}`}
                                                        visible={contentVisible}
                                                >
                                                        {itemElements}
                                                </ContentLayoutAnimated>

                                                <EmptyContentLayoutAnimated
                                                        contentStyle={emptyContentLayoutAnimatedStyle}
                                                        lazy={true}
                                                        testID={`virtualList__emptyContentLayoutAnimated--${id}`}
                                                        unmount={true}
                                                        visible={emptyContentVisible}
                                                >
                                                        {emptyComponent ?? (
                                                                <SupportingText
                                                                        size='medium'
                                                                        testID={`virtualList__supportingText--${id}`}
                                                                        type='body'
                                                                >
                                                                        No data
                                                                </SupportingText>
                                                        )}
                                                </EmptyContentLayoutAnimated>

                                                <LoadingContentLayoutAnimated
                                                        contentStyle={emptyContentLayoutAnimatedStyle}
                                                        lazy={true}
                                                        testID={`virtualList__loadingContentLayoutAnimated--${id}`}
                                                        unmount={true}
                                                        visible={loadingVisible}
                                                >
                                                        {loadingComponent ?? (
                                                                <SupportingText
                                                                        size='medium'
                                                                        testID={`virtualList__supportingText--${id}`}
                                                                        type='body'
                                                                >
                                                                        Loading
                                                                </SupportingText>
                                                        )}
                                                </LoadingContentLayoutAnimated>
                                        </AnimatedContent>
                                </AnimatedScrollView>
                        )}
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
