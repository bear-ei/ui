import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {Tooltip} from '../Tooltip'
import {MenuList} from './Menu-list'
import type {RenderMenuProps} from './Menu.interface'

export const RenderMenu = forwardRef<View, RenderMenuProps>(
        (
                {
                        activeKey,
                        activeKeys,
                        data,
                        focusedIndex,
                        id,
                        listType,
                        multiple,
                        onActive,
                        onActives,
                        onKeyDown,
                        onVisible,
                        shape = SHAPE.SMALL,
                        testID,
                        type,
                        visible,
                        ...tooltipProps
                },
                ref
        ) => {
                const supporting = (
                        <MenuList
                                activeKey={activeKey}
                                activeKeys={activeKeys}
                                data={data}
                                focusedIndex={focusedIndex}
                                listType={listType}
                                multiple={multiple}
                                onActive={onActive}
                                onActives={onActives}
                                onKeyDown={onKeyDown}
                                ref={ref}
                                shape={shape}
                                testID={`menu__list--${id}`}
                                type={type}
                        />
                )

                return (
                        <View
                                className='flex-1'
                                testID={testID ?? `menu--${id}`}
                        >
                                <Tooltip
                                        {...tooltipProps}
                                        elevation={2}
                                        onVisible={onVisible}
                                        shape={shape}
                                        supporting={supporting}
                                        type={type}
                                        visible={visible}
                                />
                        </View>
                )
        }
)

RenderMenu.displayName = 'RenderMenu'
