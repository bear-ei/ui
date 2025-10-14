import {LAYOUT} from '@/constants'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderLayoutProps} from './Layout.interface'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
        ({children, id, style: rawStyle, testID, layoutType, ...containerProps}, ref) => {
                const layoutAnimatedStyle = {
                        flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'
                } as ViewStyle

                return (
                        <LayoutAnimated
                                {...containerProps}
                                className='flex flex-1 self-stretch bg-[--color-surface-container]'
                                ref={ref}
                                style={[rawStyle, layoutAnimatedStyle]}
                                testID={testID ?? `layout--${id}`}
                        >
                                {children}
                        </LayoutAnimated>
                )
        }
)

RenderLayout.displayName = 'RenderLayout'
