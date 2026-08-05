import {LAYOUT} from '@/constants'
import {classesName} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderSkeletonElementProps} from './Skeleton-element.interface'

export const RenderSkeletonElement = forwardRef<View, RenderSkeletonElementProps>(
    ({children, id, testID, layoutType, className, ...props}, ref) => {
        const isChildren = !!children

        return (
            <View
                {...props}
                ref={ref}
                testID={testID ?? `skeletonElement--${id}`}
                className={classesName(
                    'flex min-h-6 min-w-6 gap-2',
                    {
                        ['bg-[--color-on-surface] opacity-10']: !isChildren,
                        ['bg-transparent']: isChildren,
                        ['flex-col justify-center']: layoutType === LAYOUT.VERTICAL,
                        ['flex-row items-center']: layoutType === LAYOUT.HORIZONTAL
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
