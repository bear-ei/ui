import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {ELEVATION} from '../Elevation'
import {Popover} from '../Popover'
import {MenuList} from './Menu-list'
import type {RenderMenuProps} from './Menu.interface'

export const RenderMenu = forwardRef<View, RenderMenuProps>(
        (
                {
                        activeKey,
                        activeKeys,
                        closeTrailing,
                        data,
                        elevation = ELEVATION.LEVEL_2,
                        emptyElement,
                        focusedIndex,
                        id,
                        listType,
                        multiple,
                        onActive,
                        onActives,
                        onKeyDown,
                        onVisible,
                        shape = SHAPE.SMALL,
                        size,
                        testID,
                        trailingTriggerOn,
                        type,
                        visible,
                        ...tooltipProps
                },
                ref
        ) => {
                const popoverContentElement = (
                        <MenuList
                                activeKey={activeKey}
                                activeKeys={activeKeys}
                                closeTrailing={closeTrailing}
                                data={data}
                                emptyElement={emptyElement}
                                focusedIndex={focusedIndex}
                                listType={listType}
                                multiple={multiple}
                                onActive={onActive}
                                onActives={onActives}
                                onKeyDown={onKeyDown}
                                ref={ref}
                                shape={shape}
                                size={size}
                                testID={`menu__list--${id}`}
                                trailingTriggerOn={trailingTriggerOn}
                                type={type}
                        />
                )

                return (
                        <View
                                className='flex-1'
                                testID={testID ?? `menu--${id}`}
                                // {...(['web', 'windows', 'macos'].includes(Platform.OS) && {onKeyDown})}
                        >
                                <Popover
                                        {...tooltipProps}
                                        content={popoverContentElement}
                                        elevation={elevation}
                                        onKeyDown={onKeyDown}
                                        onVisible={onVisible}
                                        shape={shape}
                                        type={type}
                                        visible={visible}
                                />
                        </View>
                )
        }
)

RenderMenu.displayName = 'RenderMenu'
