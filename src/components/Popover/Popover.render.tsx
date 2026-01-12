import {classesName} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderPopoverProps} from './Popover.interface'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
        ({children, className, id, testID, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className={classesName('relative flex flex-col', className)}
                        ref={ref}
                        testID={testID ?? `popover--${id}`}
                >
                        {children}
                </View>
        )
)

RenderPopover.displayName = 'RenderPopover'
