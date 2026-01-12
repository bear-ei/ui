import {POPOVER_TYPE} from '@/components/Popover'
import {useTheme} from '@/hooks'
import {forwardRef, useEffect, useId, useImperativeHandle, useRef} from 'react'
import type {View} from 'react-native'
import type {MenuListBaseProps} from './Menu-list.interface'
import {RenderMenuList} from './Menu-list.render'

export const MenuListBase = forwardRef<View, MenuListBaseProps>(({visible, type, ...props}, ref) => {
        const id = useId()
        const theme = useTheme()
        const containerRef = useRef<View>(null)

        useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

        useEffect(() => {
                if (visible && type === POPOVER_TYPE.CONTEXT_MENU) {
                        containerRef.current?.focus?.()
                }
        }, [type, visible])

        return (
                <RenderMenuList
                        {...props}
                        id={id}
                        ref={containerRef}
                        theme={theme}
                        type={type}
                />
        )
})

MenuListBase.displayName = 'MenuListBase'
