import {forwardRef, useEffect, useId, useRef} from 'react'
import type {View} from 'react-native'

import {useMergeRefs} from '../../../hooks'
import {POPOVER_TYPE} from '../../Popover'

import type {MenuListBaseProps} from './Menu-list.interface'
import {RenderMenuList} from './Menu-list.render'

export const MenuListBase = forwardRef<View, MenuListBaseProps>(({visible, type, ...props}, ref) => {
	const id = useId()
	const containerRef = useRef<View>(null)
	const mergedRef = useMergeRefs([ref, containerRef])

	useEffect(() => {
		if (!(visible && type === POPOVER_TYPE.CONTEXT_MENU)) {
			return
		}

		const frame = requestAnimationFrame(() => {
			containerRef.current?.focus()
		})

		return () => cancelAnimationFrame(frame)
	}, [type, visible])

	return (
		<RenderMenuList
			{...props}
			id={id}
			ref={mergedRef}
			type={type}
		/>
	)
})
