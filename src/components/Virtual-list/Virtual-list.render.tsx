import {COMPONENT_STATUS, LAYOUT} from '@/constants'
import {platformValue, typographyClasses} from '@/utils'
import {TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {cloneElement, forwardRef, type ForwardedRef} from 'react'
import {ScrollView, Text, View, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../Layout-animated'
import {VirtualListItem, type RenderVirtualListItemInfo} from './Virtual-list-item'
import type {RenderVirtualListItemOptions, RenderVirtualListProps} from './Virtual-list.interface'

export const RenderVirtualListItem = <T,>({
        containerLayout,
        data,
        draggable,
        id,
        onLoadEnd,
        renderItem,
        ...virtualListItemProps
}: RenderVirtualListItemOptions<T>) => {
        if (data?.length === 0) {
                onLoadEnd?.()

                return
        }

        return (
                <>
                        {data?.map((item, index) => (
                                <VirtualListItem
                                        {...virtualListItemProps}
                                        {...(index === data.length - 1 && {onLoadEnd})}
                                        {...(draggable && {containerLayout})}
                                        draggable={draggable}
                                        item={item}
                                        key={`${(item?.indexKey as string) ?? index}`}
                                        testID={`virtualList__virtualListItem--${id}`}
                                        renderItem={
                                                renderItem as (
                                                        options: RenderVirtualListItemInfo<Record<string, unknown>>
                                                ) => React.JSX.Element
                                        }
                                />
                        ))}
                </>
        )
}

export const RenderVirtualListInner = <T,>(
        {
                containerLayout,
                contentAnimatedStyle,
                contentSize = 0,
                emptyElement,
                emptyList,
                id,
                interactionHandlers,
                itemElements,
                layoutType,
                loading,
                loadingElement,
                scrollEventThrottle = 50,
                status,
                testID,
                ...containerProps
        }: RenderVirtualListProps<T>,
        ref: React.ForwardedRef<Animated.ScrollView>
) => {
        const {onLayout} = interactionHandlers
        const isContentVisible = !loading && !emptyList && typeof emptyList === 'boolean'
        const isEmptyContentVisible = !loading && emptyList && status === COMPONENT_STATUS.SUCCEEDED
        const isLayoutCompleted =
                typeof containerLayout?.height === 'number' && (containerLayout.height > 0 || containerLayout.width > 0)

        return (
                <View
                        className='relative flex-1 self-stretch'
                        onLayout={onLayout}
                        testID={testID ?? `virtualList--${id}`}
                >
                        {isLayoutCompleted && (
                                <LayoutAnimated
                                        className='absolute bottom-0 left-0 right-0 top-0'
                                        testID={`virtualList__contentLayout--${id}`}
                                        visible={isContentVisible}
                                >
                                        <Animated.ScrollView
                                                {...containerProps}
                                                contentContainerStyle={
                                                        {
                                                                ...(layoutType === LAYOUT.VERTICAL && {
                                                                        minHeight: platformValue(contentSize)
                                                                }),
                                                                ...(layoutType === LAYOUT.HORIZONTAL && {
                                                                        minWidth: platformValue(contentSize)
                                                                }),
                                                                alignSelf: 'stretch',
                                                                flex: 1
                                                        } as ViewStyle
                                                }
                                                horizontal={layoutType === LAYOUT.HORIZONTAL}
                                                ref={ref}
                                                scrollEventThrottle={scrollEventThrottle}
                                                testID={`virtualList__animatedScrollView--${id}`}
                                        >
                                                <Animated.View
                                                        className='relative flex-1'
                                                        style={contentAnimatedStyle}
                                                        testID={`virtualList__animatedContent--${id}`}
                                                >
                                                        {itemElements}
                                                </Animated.View>
                                        </Animated.ScrollView>
                                </LayoutAnimated>
                        )}

                        <LayoutAnimated
                                className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
                                lazy={true}
                                testID={`virtualList__emptyContentLayout--${id}`}
                                visible={isEmptyContentVisible}
                        >
                                {emptyElement ?? (
                                        <Text
                                                className={typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.MEDIUM)(
                                                        'color-[--color-on-surface-variant]'
                                                )}
                                                testID={`virtualList__supportingText--${id}`}
                                        >
                                                No data
                                        </Text>
                                )}
                        </LayoutAnimated>

                        <LayoutAnimated
                                className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
                                lazy={true}
                                testID={`virtualList__loadingContentLayout--${id}`}
                                visible={loading}
                        >
                                {loadingElement ?
                                        cloneElement(loadingElement, {loading})
                                :       <Text
                                                className={typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.MEDIUM)(
                                                        'color-[--color-on-surface-variant]'
                                                )}
                                                testID={`virtualList__supportingText--${id}`}
                                        >
                                                Loading
                                        </Text>
                                }
                        </LayoutAnimated>
                </View>
        )
}

export const RenderVirtualList = forwardRef(RenderVirtualListInner) as <T>(
        props: RenderVirtualListProps<T> & {ref?: ForwardedRef<ScrollView>}
) => ReturnType<typeof RenderVirtualListInner>
