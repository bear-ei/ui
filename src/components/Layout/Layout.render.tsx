import {LAYOUT} from '@/constants'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderLayoutProps} from './Layout.interface'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
        ({children, id, style: rawStyle, testID, layoutType, className, ...containerProps}, ref) => {
                const layoutAnimatedStyle = {
                        flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'
                } as ViewStyle

                return (
                        <LayoutAnimated
                                {...containerProps}
                                className={clsx('flex flex-1 self-stretch bg-[--color-surface-container]', className)}
                                defaultVisible={true}
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
