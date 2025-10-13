import {Drag} from '@/components/Drag'
import {Elevation} from '@/components/Elevation'
import {LAYOUT} from '@/constants'
import {platformValue} from '@/utils'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View, ViewStyle} from 'react-native'
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
                        itemSize = 0,
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
        ) => (
                <Animated.View
                        {...containerProps}
                        className={clsx('absolute bottom-0 left-0 right-0 top-0 flex flex-col')}
                        ref={ref}
                        style={[
                                {
                                        ...(layoutType === LAYOUT.VERTICAL ?
                                                {height: platformValue(itemSize)}
                                        :       {width: platformValue(itemSize)}),
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
                                                                        {height: platformValue(itemSize - gap)}
                                                                :       {width: platformValue(itemSize - gap)}),
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
)

RenderVirtualListItem.displayName = 'RenderVirtualListItem'
