import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {MenuBaseProps, MenuState} from './Menu.interface'

import {usePendingEvent} from '../../hooks'
import {POPOVER_TYPE} from '../Popover'
import {
	handleMenuKeyDown,
	handleMenuKeyDownEvent,
	updateMenuActive,
	updateMenuActives,
	updateMenuVisible
} from './Menu.handler'
import {RenderMenu} from './Menu.render'

export const MenuBase: FC<MenuBaseProps> = ({
	activeKey: rawActiveKey,
	activeKeys: rawActiveKeys,
	data,
	defaultActiveKey,
	defaultActiveKeys,
	defaultVisible,
	keyCode,
	multiple,
	onActive: rawOnActive,
	onActives: rawOnActives,
	onFocusKey,
	onVisible: rawOnVisible,
	type = POPOVER_TYPE.CONTEXT_MENU,
	visible: rawIsVisible,
	...renderProps
}) => {
	const [
		{
			activeKey,
			activeKeys,
			focusedIndex,
			pendingActiveEvent,
			pendingActivesEvent,
			pendingFocusKeyEvent,
			pendingVisibleEvent,
			visible: isVisible
		},
		setState
	] = useImmer<MenuState>({
		activeKey: rawActiveKey ?? defaultActiveKey,
		activeKeys: rawActiveKeys ?? defaultActiveKeys,
		visible: rawIsVisible ?? defaultVisible
	})

	usePendingEvent('pendingActiveEvent', rawOnActive, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingActivesEvent', rawOnActives, {pendingEvent: pendingActivesEvent, setState})
	usePendingEvent('pendingFocusKeyEvent', onFocusKey, {pendingEvent: pendingFocusKeyEvent, setState})
	usePendingEvent('pendingVisibleEvent', rawOnVisible, {pendingEvent: pendingVisibleEvent, setState})

	const id = useId()
	const onActive = useMemo(() => updateMenuActive(setState, rawOnActive), [rawOnActive, setState])
	const onActives = useMemo(() => updateMenuActives(setState, rawOnActives), [rawOnActives, setState])
	const onKeyDown = useMemo(
		() => handleMenuKeyDownEvent(setState, {data, onActive: rawOnActive, onActives: rawOnActives, onFocusKey}),
		[data, onFocusKey, rawOnActive, rawOnActives, setState]
	)

	const onVisible = useMemo(
		() => updateMenuVisible(setState, {onVisible: rawOnVisible, type}),
		[rawOnVisible, setState, type]
	)

	const runUpdateActive = onActive
	const runUpdateActives = onActives
	const runUpdateVisible = onVisible
	const runKeyDown = useMemo(
		() =>
			handleMenuKeyDown(setState, {
				activeKey,
				activeKeys,
				data,
				multiple,
				onActive: rawOnActive,
				onActives: rawOnActives,
				onFocusKey
			}),
		[activeKey, activeKeys, data, multiple, rawOnActive, rawOnActives, setState, onFocusKey]
	)

	useEffect(() => {
		runKeyDown(keyCode)
	}, [keyCode, runKeyDown])

	useEffect(() => {
		runUpdateActive(rawActiveKey)
	}, [rawActiveKey, runUpdateActive])

	useEffect(() => {
		runUpdateActives(rawActiveKeys)
	}, [rawActiveKeys, runUpdateActives])

	useEffect(() => {
		runUpdateVisible(rawIsVisible)
	}, [rawIsVisible, runUpdateVisible])

	return (
		<RenderMenu
			{...renderProps}
			activeKey={activeKey}
			activeKeys={activeKeys}
			data={data}
			focusedIndex={focusedIndex}
			id={id}
			multiple={multiple}
			onActive={onActive}
			onActives={onActives}
			onKeyDown={onKeyDown}
			onVisible={onVisible}
			type={type}
			visible={isVisible}
		/>
	)
}
