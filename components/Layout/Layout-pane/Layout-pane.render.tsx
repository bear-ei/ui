import {LayoutAnimated} from '@/components/Layout-animated'
import {DURATION, EASING, LAYOUT} from '@/constants'
import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
        ({children, id, layoutType, style, testID, ...containerProps}, ref) => (
                <LayoutAnimated
                        {...containerProps}
                        className='flex flex-1 flex-col self-stretch bg-[--color-surface]'
                        entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
                        exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
                        ref={ref}
                        style={[style, {flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'}]}
                        testID={testID ?? `layoutPane--${id}`}
                >
                        {children}
                </LayoutAnimated>
        )
)

RenderLayoutPane.displayName = 'RenderLayoutPane'
