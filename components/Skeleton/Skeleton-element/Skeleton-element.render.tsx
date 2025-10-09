import {LAYOUT} from '@/constants'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderSkeletonElementProps} from './Skeleton-element.interface'

export const RenderSkeletonElement = forwardRef<View, RenderSkeletonElementProps>(
        ({children, id, testID, layoutType, className, ...props}, ref) => {
                const isVisible = !!children

                return (
                        <View
                                {...props}
                                ref={ref}
                                testID={testID ?? `skeletonElement--${id}`}
                                className={clsx(
                                        'flex min-h-6 min-w-6 gap-2',
                                        {
                                                ['bg-transparent']: isVisible,
                                                ['bg-[--color-on-surface] opacity-10']: !isVisible,
                                                ['flex-row items-center']: layoutType === LAYOUT.HORIZONTAL,
                                                ['flex-col justify-center']: layoutType === LAYOUT.VERTICAL
                                        },
                                        className
                                )}
                        >
                                {children}
                        </View>
                )
        }
)

RenderSkeletonElement.displayName = 'RenderSkeletonElement'
