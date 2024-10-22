import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {UnderlayBaseProps, UnderlayProps} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const handleUnderlayPropsEqual = (prevProps: UnderlayProps) => {
    const {eventName: prevEventName, active: prevActive} = prevProps

    return (nextProps: UnderlayProps) => {
        const {eventName: nextEventName, active: nextActive} = nextProps

        return ![
            prevEventName !== nextEventName,
            prevActive !== nextActive
        ].some(Boolean)
    }
}

export const UnderlayBase = forwardRef<View, UnderlayBaseProps>(
    (
        {
            active: activeSource,
            activeAnimatedType,
            activeScale,
            defaultActive,
            eventName,
            opacities,
            render,
            ...renderProps
        },
        ref
    ) => {
        const id = useId()
        const active = activeSource ?? defaultActive
        const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} =
            useUnderlayAnimated({
                active,
                activeAnimatedType,
                activeScale,
                eventName,
                opacities
            })

        return render({
            ...renderProps,
            hoverLayerAnimatedStyle,
            activeLayerAnimatedStyle,
            id,
            ref,
            active
        })
    }
)
