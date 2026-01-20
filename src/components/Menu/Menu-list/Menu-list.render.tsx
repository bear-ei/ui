import {List, LIST_SELECT_TYPE, LIST_TYPE} from '@/components/List'
import {POPOVER_TYPE} from '@/components/Popover'
import {classesName, platformValue} from '@/utils'
import {SIZE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {Platform, View, type ViewStyle} from 'react-native'
import type {RenderMenuListProps} from './Menu-list.interface'

export const RenderMenuList = forwardRef<View, RenderMenuListProps>(
        (
                {
                        data,
                        id,
                        listType = LIST_TYPE.MENU,
                        multiple,
                        onKeyDown,
                        size = SIZE.SMALL,
                        testID,
                        theme,
                        type,
                        ...menuProps
                },
                ref
        ) => {
                const dataNumber = data?.length ?? 0
                const sizeDensity = {
                        [SIZE.EXTRA_LARGE]: 16,
                        [SIZE.EXTRA_SMALL]: 8,
                        [SIZE.LARGE]: 14,
                        [SIZE.MEDIUM]: 12,
                        [SIZE.SMALL]: 10
                }

                const itemSize = theme.token.spacing.extraSmall * sizeDensity[size]
                const height = dataNumber * itemSize + theme.token.spacing.medium
                const menuListStyle = {height: platformValue(height)} as ViewStyle

                return (
                        <View
                                {...(['web', 'windows', 'macos'].includes(Platform.OS) && {onKeyDown})}
                                className={classesName('overflow-hidden bg-[--color-surface-container] outline-none', {
                                        ['min-h-80']: type === POPOVER_TYPE.TEXT_INPUT_PICKER,
                                        ['w-[11.25rem]']: type === POPOVER_TYPE.CONTEXT_MENU
                                })}
                                ref={ref}
                                style={[menuListStyle]}
                                tabIndex={-1}
                                testID={testID ?? `menuList--${id}`}
                        >
                                <List
                                        {...menuProps}
                                        data={data}
                                        itemSize={itemSize}
                                        selectType={multiple ? LIST_SELECT_TYPE.MULTIPLE : LIST_SELECT_TYPE.SINGLE}
                                        showsVerticalScrollIndicator={false}
                                        size={size}
                                        testID={`menuList__list--${id}`}
                                        type={listType}
                                />
                        </View>
                )
        }
)

RenderMenuList.displayName = 'RenderMenuList'
