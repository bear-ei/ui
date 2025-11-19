import {classesName} from '@/utils'
import {forwardRef, type FC} from 'react'
import {View} from 'react-native'
import {NavigationRailItem} from './Navigation-rail-item'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import type {RenderNavigationRailItemOptions, RenderNavigationRailProps} from './Navigation-rail.interface'

export const RenderNavigationRailItems: FC<RenderNavigationRailItemOptions> = ({
        id,
        data,
        ...renderNavigationRailItemProps
}) =>
        data?.map(({indexKey, ...props}, index) => (
                <NavigationRailItem
                        {...props}
                        {...renderNavigationRailItemProps}
                        indexKey={indexKey ?? index.toString()}
                        key={indexKey}
                        testID={`navigationRail__navigationRailItem--${id}`}
                />
        ))

export const RenderNavigationRail = forwardRef<View, RenderNavigationRailProps>(
        ({destinationPosition, id, itemElements, menuElement, testID, fabElement, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className='flex w-20 flex-1 flex-col items-center self-stretch pb-14 pt-14'
                        ref={ref}
                        testID={testID ?? `navigationRail--${id}`}
                >
                        {menuElement && (
                                <View
                                        className='mb-4 flex h-8 w-8 items-center justify-center overflow-hidden'
                                        testID={`navigationRail__menu--${id}`}
                                >
                                        {menuElement}
                                </View>
                        )}

                        {fabElement && (
                                <View
                                        className='mb-10 h-12 w-12 overflow-hidden'
                                        testID={`navigationRail__fab--${id}`}
                                >
                                        {fabElement}
                                </View>
                        )}

                        <View
                                className={classesName('flex flex-1 flex-col items-center gap-3 self-stretch', {
                                        ['justify-center']:
                                                destinationPosition === NAVIGATION_DESTINATION_POSITION.CENTER,

                                        ['justify-start']: destinationPosition === NAVIGATION_DESTINATION_POSITION.TOP,
                                        ['justify-end']: destinationPosition === NAVIGATION_DESTINATION_POSITION.BOTTOM
                                })}
                                testID={`navigationRail__destination--${id}`}
                        >
                                {itemElements}
                        </View>
                </View>
        )
)

RenderNavigationRail.displayName = 'RenderNavigationRail'
