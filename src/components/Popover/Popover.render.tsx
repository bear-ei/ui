import {classesName} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {Elevation} from '../Elevation'
import {POPOVER_TYPE} from './Popover.enum'
import type {RenderPopoverProps} from './Popover.interface'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
        ({children, className, elevation, id, shape, testID, type, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className={classesName('relative flex flex-col', className)}
                        ref={ref}
                        testID={testID ?? `popover--${id}`}
                >
                        {children && type !== POPOVER_TYPE.TEXT_INPUT_PICKER && children}
                        {typeof elevation === 'number' && type === POPOVER_TYPE.TEXT_INPUT_PICKER && (
                                <Elevation
                                        level={elevation}
                                        shape={shape}
                                        testID={`popoverContent_elevation--${id}`}
                                />
                        )}
                </View>
        )
)

RenderPopover.displayName = 'RenderPopover'
