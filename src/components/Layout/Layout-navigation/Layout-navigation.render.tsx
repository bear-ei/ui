import {LayoutAnimated} from '@/components/Layout-animated'
import {classesName} from '@/utils'
import {DURATION, EASING} from '@bearei/theme-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'

export const RenderLayoutNavigation = forwardRef<View, RenderLayoutNavigationProps>(
    ({children, id, testID, className, ...containerProps}, ref) => (
        <LayoutAnimated
            {...containerProps}
            className={classesName('flex max-w-80 flex-col self-stretch bg-[--color-surface-container]', className)}
            entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
            exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
            ref={ref}
            testID={testID ?? `layoutNavigation--${id}`}
        >
            {children}
        </LayoutAnimated>
    )
)

RenderLayoutNavigation.displayName = 'RenderLayoutNavigation'
