import {LayoutAnimated} from '@/components/Layout-animated'
import {LAYOUT} from '@/constants'
import {classesName} from '@/utils'
import {DURATION, EASING} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View, type ViewStyle} from 'react-native'
import type {RenderLayoutPaneProps} from './Layout-pane.interface'

export const RenderLayoutPane = forwardRef<View, RenderLayoutPaneProps>(
        ({children, id, layoutType, style, testID, className, ...containerProps}, ref) => {
                const layoutPaneStyle = {
                        flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'
                } as ViewStyle

                return (
                        <LayoutAnimated
                                {...containerProps}
                                className={classesName(
                                        'flex flex-1 flex-col self-stretch bg-[--color-surface]',
                                        className
                                )}
                                entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
                                exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
                                ref={ref}
                                style={[style, layoutPaneStyle]}
                                testID={testID ?? `layoutPane--${id}`}
                        >
                                {children}
                        </LayoutAnimated>
                )
        }
)

RenderLayoutPane.displayName = 'RenderLayoutPane'
