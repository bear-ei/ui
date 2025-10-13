import {shapeClasses} from '@/constants'
import {pxToRem, SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Platform, View, ViewStyle} from 'react-native'
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
                const height = Platform.select({
                        web: pxToRem()(dataNumber * itemSize + theme.token.spacing.medium),
                        default: dataNumber * itemSize + theme.token.spacing.medium
                })

                return (
                        <View
                                {...(['web', 'windows', 'macos'].includes(Platform.OS) && {onKeyDown})}
                                className={clsx(
                                        'w-[11.25rem] overflow-hidden bg-[--color-surface-container] outline-none',
                                        shapeClasses(shape)
                                )}
                                ref={ref}
                                style={[
                                        Platform.select({default: {height}, web: {height: `${height}rem`}}) as ViewStyle
                                ]}
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
                                        size={size}
                                        testID={`menu__list--${id}`}
                                        type={listType}
                                />
                        </View>
                )
        }
)

RenderMenuList.displayName = 'RenderMenuList'
