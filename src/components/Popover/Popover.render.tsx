import {classesName} from '@/utils'
import {cloneElement, forwardRef} from 'react'
import {View} from 'react-native'
import {POPOVER_TYPE} from './Popover.enum'
import type {RenderPopoverProps} from './Popover.interface'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
        (
                {
                        children,
                        className,
                        id,
                        interactionHandlers,
                        onContextMenu,
                        onKeyDown,
                        testID,
                        type,
                        ...containerProps
                },
                ref
        ) => {
                const {onFocus, onHoverIn, ...childrenInteractionHandlers} = interactionHandlers

                return (
                        <View
                                {...containerProps}
                                className={classesName('flex flex-col', className)}
                                ref={ref}
                                testID={testID ?? `popover--${id}`}
                        >
                                {children &&
                                        cloneElement(children, {
                                                onFocus,
                                                onHoverIn,
                                                ...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu}),
                                                ...(type === POPOVER_TYPE.TEXT_INPUT_PICKER && {onKeyDown}),
                                                ...childrenInteractionHandlers
                                        })}
                        </View>
                )
        }
)

RenderPopover.displayName = 'RenderPopover'
