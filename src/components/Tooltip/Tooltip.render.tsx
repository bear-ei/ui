import {classesName} from '@/utils'
import {cloneElement, forwardRef} from 'react'
import {View} from 'react-native'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import type {RenderTooltipProps} from './Tooltip.interface'

export const RenderTooltip = forwardRef<View, RenderTooltipProps>(
        ({children, className, id, interactionHandlers, onContextMenu, testID, type, ...containerProps}, ref) => {
                const {onFocus, onHoverIn, ...childrenInteractionHandlers} = interactionHandlers

                return (
                        <View
                                {...containerProps}
                                className={classesName('flex flex-col', className)}
                                ref={ref}
                                testID={testID ?? `tooltip--${id}`}
                        >
                                {children &&
                                        cloneElement(children, {
                                                onFocus,
                                                onHoverIn,
                                                ...childrenInteractionHandlers,
                                                ...(type === TOOLTIP_TYPE.CONTEXT_MENU && {onContextMenu})
                                        })}
                        </View>
                )
        }
)

RenderTooltip.displayName = 'RenderTooltip'
