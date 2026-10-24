import type {View} from 'react-native'

import {useEffect, useId, useRef, type FC} from 'react'

import type {MenuListBaseProps} from './Menu-list.interface'

import {useMergeRefs} from '../../../hooks'
import {POPOVER_TYPE} from '../../Popover'
import {RenderMenuList} from './Menu-list.render'

export const MenuListBase: FC<MenuListBaseProps> = ({ref, type, visible, ...props}) => {
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
}
