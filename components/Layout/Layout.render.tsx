import {LAYOUT} from '@/constants'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderLayoutProps} from './Layout.interface'

export const RenderLayout = forwardRef<View, RenderLayoutProps>(
        ({children, id, style: rawStyle, testID, layoutType, ...containerProps}, ref) => (
                <LayoutAnimated
                        {...containerProps}
                        className='flex flex-1 self-stretch bg-[--color-surface-container]'
                        ref={ref}
                        style={[rawStyle, {flexDirection: layoutType === LAYOUT.HORIZONTAL ? 'row' : 'column'}]}
                        testID={testID ?? `layout--${id}`}
                >
                        {children}
                </LayoutAnimated>
        )
)

RenderLayout.displayName = 'RenderLayout'
