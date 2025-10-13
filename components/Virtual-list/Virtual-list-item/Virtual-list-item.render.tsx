import {Drag} from '@/components/Drag'
import {Elevation} from '@/components/Elevation'
import {LAYOUT} from '@/constants'
import {pxToRem} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Platform, View, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'

export const RenderVirtualListItem = forwardRef<View, RenderVirtualListItemProps>(
        (
                {
                        containerAnimatedStyle,
                        containerLayout,
                        draggable,
                        dragging,
                        dragOffset,
                        dragRef,
                        gap = 0,
                        id,
                        itemElement,
                        itemSize: rawItemSize = 0,
                        layoutType,
                        onDragEnd,
                        onDragStart,
                        onDragUpdate,
                        shape,
                        testID,
                        zIndex,
                        ...containerProps
                },
                ref
        ) => {
                const itemSize = Platform.select({
                        default: rawItemSize,
                        web: pxToRem()(rawItemSize)
                })

                const itemSizeWithGap = Platform.select({
                        default: rawItemSize - gap,
                        web: pxToRem()(rawItemSize - gap)
                })

                return (
                        <Animated.View
                                {...containerProps}
                                className={clsx('absolute bottom-0 left-0 right-0 top-0 flex flex-col')}
                                ref={ref}
                                style={[
                                        {
                                                ...(layoutType === LAYOUT.VERTICAL ?
                                                        Platform.select({
                                                                default: {height: itemSize},
                                                                web: {height: `${itemSize}rem`}
                                                        })
                                                :       Platform.select({
                                                                default: {width: itemSize},
                                                                web: {width: `${itemSize}rem`}
                                                        })),
                                                zIndex
                                        } as ViewStyle,
                                        containerAnimatedStyle
                                ]}
                                testID={testID ?? `virtualListItem--${id}`}
                        >
                                {draggable ?
                                        <Drag
                                                height={containerLayout?.height}
                                                layoutType={layoutType}
                                                offset={dragOffset}
                                                onEnd={onDragEnd}
                                                onStart={onDragStart}
                                                onUpdate={onDragUpdate}
                                                ref={dragRef}
                                                testID={`virtualListItem__drag--${id}`}
                                                width={containerLayout?.width}
                                        >
                                                <View
                                                        style={[
                                                                {
                                                                        ...(layoutType === LAYOUT.VERTICAL ?
                                                                                Platform.select({
                                                                                        default: {
                                                                                                height: itemSizeWithGap
                                                                                        },
                                                                                        web: {
                                                                                                height: `${itemSizeWithGap}rem`
                                                                                        }
                                                                                })
                                                                        :       Platform.select({
                                                                                        default: {
                                                                                                width: itemSizeWithGap
                                                                                        },
                                                                                        web: {
                                                                                                width: `${itemSizeWithGap}rem`
                                                                                        }
                                                                                })),
                                                                        zIndex
                                                                } as ViewStyle
                                                        ]}
                                                        testID={`virtualListItem__dragContent--${id}`}
                                                >
                                                        {itemElement}
                                                        <Elevation
                                                                level={dragging ? 2 : 0}
                                                                shape={shape}
                                                                testID={`virtualListItem__elevation--${id}`}
                                                        />
                                                </View>
                                        </Drag>
                                :       itemElement}
                        </Animated.View>
                )
        }
)

RenderVirtualListItem.displayName = 'RenderVirtualListItem'
