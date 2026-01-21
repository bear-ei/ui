import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {Popover, POPOVER_TYPE} from '../Popover'
import {MenuList} from './Menu-list'
import type {RenderMenuProps} from './Menu.interface'

export const RenderMenu = forwardRef<View, RenderMenuProps>(
        (
                {
                        activeKey,
                        activeKeys,
                        children,
                        closeTrailing,
                        data,
                        elevation,
                        emptyElement,
                        focusedIndex,
                        id,
                        listType,
                        multiple,
                        onActive,
                        onActives,
                        onClose,
                        onKeyDown,
                        onVisible,
                        shape = SHAPE.MEDIUM,
                        size,
                        testID,
                        trailingTriggerOn,
                        type,
                        visible,
                        ...popoverProps
                },
                ref
        ) => {
                const popoverContentElement = (
                        <MenuList
                                {...(type === POPOVER_TYPE.CONTEXT_MENU && {onKeyDown})}
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
                                onClose={onClose}
                                ref={ref}
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
                        >
                                <Popover
                                        {...popoverProps}
                                        content={popoverContentElement}
                                        elevation={elevation}
                                        onKeyDown={onKeyDown}
                                        onVisible={onVisible}
                                        shape={shape}
                                        type={type}
                                        visible={visible}
                                >
                                        {children}
                                </Popover>
                        </View>
                )
        }
)

RenderMenu.displayName = 'RenderMenu'
