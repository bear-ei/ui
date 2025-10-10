import {clsx} from 'clsx'
import {cloneElement, forwardRef} from 'react'
import {View} from 'react-native'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import type {RenderTooltipProps} from './Tooltip.interface'

export const RenderTooltip = forwardRef<View, RenderTooltipProps>(
        ({children, id, interactionHandlers, onContextMenu, testID, type, className, ...containerProps}, ref) => {
                const {onFocus, onHoverIn, ...onChildrenInteractionHandlers} = interactionHandlers

                return (
                        <View
                                {...containerProps}
                                className={clsx('flex flex-col', className)}
                                ref={ref}
                                testID={testID ?? `tooltip--${id}`}
                        >
                                {children &&
                                        cloneElement(children, {
                                                onFocus,
                                                onHoverIn,
                                                ...onChildrenInteractionHandlers,
                                                ...(type === TOOLTIP_TYPE.MENU && {onContextMenu})
                                        })}
                        </View>
                )
        }
)

RenderTooltip.displayName = 'RenderTooltip'
