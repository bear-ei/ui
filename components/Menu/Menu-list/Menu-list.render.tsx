import {shapeClasses} from '@/constants'
import {SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Platform, View} from 'react-native'
import type {InteractionHandlers} from '../../../hooks'
import {List, LIST_SELECT_TYPE, LIST_TYPE} from '../../List'
import type {RenderMenuListProps} from './Menu-list.interface'

export const RenderMenuList = forwardRef<View, RenderMenuListProps>(
        (
                {
                        data,
                        id,
                        listType = LIST_TYPE.MENU,
                        multiple,
                        onFocus,
                        onKeyDown,
                        shape,
                        size = SIZE.MEDIUM,
                        testID,
                        theme,
                        type,
                        ...menuProps
                },
                ref
        ) => {
                const dataNumber = data?.length ?? 0
                const sizeDensity = {
                        [SIZE.EXTRA_LARGE]: 14,
                        [SIZE.EXTRA_SMALL]: 6,
                        [SIZE.LARGE]: 12,
                        [SIZE.MEDIUM]: 10,
                        [SIZE.SMALL]: 8
                }

                const itemSize = theme.token.spacing.extraSmall * sizeDensity[size]

                return (
                        <View
                                {...(['web', 'windows', 'macos'].includes(Platform.OS) && {onKeyDown})}
                                className={clsx('w-[180px] overflow-hidden outline-none', shapeClasses(shape))}
                                ref={ref}
                                style={{height: dataNumber * itemSize + theme.token.spacing.medium}}
                                tabIndex={-1}
                                testID={testID ?? `menu--${id}`}
                        >
                                <List
                                        {...menuProps}
                                        data={data}
                                        itemSize={itemSize}
                                        onItemStateEvent={{onFocus} as InteractionHandlers}
                                        selectType={multiple ? LIST_SELECT_TYPE.MULTIPLE : LIST_SELECT_TYPE.SINGLE}
                                        showsVerticalScrollIndicator={false}
                                        testID={`menu__list--${id}`}
                                        type={listType}
                                />
                        </View>
                )
        }
)

RenderMenuList.displayName = 'RenderMenuList'
