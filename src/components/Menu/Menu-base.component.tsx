import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {MenuBaseProps, MenuState} from './Menu.interface'

import {usePendingEvent} from '../../hooks'
import {POPOVER_TYPE} from '../Popover'
import {
	handleMenuKeyCommand,
	handleMenuKeyDownEvent,
	updateMenuActive,
	updateMenuActiveKeys,
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
	keyCommand,
	multiple,
	onActiveKeyChange: rawOnActiveKeyChange,
	onActiveKeysChange: rawOnActiveKeysChange,
	onFocusKeyChange,
	onVisibleChange: rawOnVisibleChange,
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
			pendingActiveKeysEvent,
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

	usePendingEvent('pendingActiveEvent', rawOnActiveKeyChange, {pendingEvent: pendingActiveEvent, setState})
	usePendingEvent('pendingActiveKeysEvent', rawOnActiveKeysChange, {pendingEvent: pendingActiveKeysEvent, setState})
	usePendingEvent('pendingFocusKeyEvent', onFocusKeyChange, {pendingEvent: pendingFocusKeyEvent, setState})
	usePendingEvent('pendingVisibleEvent', rawOnVisibleChange, {pendingEvent: pendingVisibleEvent, setState})

	const id = useId()
	const onActiveKeyChange = useMemo(
		() => updateMenuActive(setState, rawOnActiveKeyChange),
		[rawOnActiveKeyChange, setState]
	)
	const onActiveKeysChange = useMemo(
		() => updateMenuActiveKeys(setState, rawOnActiveKeysChange),
		[rawOnActiveKeysChange, setState]
	)
	const onKeyDown = useMemo(
		() =>
			handleMenuKeyDownEvent(setState, {
				data,
				onActiveKeyChange: rawOnActiveKeyChange,
				onActiveKeysChange: rawOnActiveKeysChange,
				onFocusKeyChange
			}),
		[data, onFocusKeyChange, rawOnActiveKeyChange, rawOnActiveKeysChange, setState]
	)

	const onVisibleChange = useMemo(
		() => updateMenuVisible(setState, {onVisibleChange: rawOnVisibleChange, type}),
		[rawOnVisibleChange, setState, type]
	)

	const runUpdateActive = onActiveKeyChange
	const runUpdateActiveKeys = onActiveKeysChange
	const runUpdateVisible = onVisibleChange
	const runKeyDown = useMemo(
		() =>
			handleMenuKeyCommand(setState, {
				activeKey,
				activeKeys,
				data,
				multiple,
				onActiveKeyChange: rawOnActiveKeyChange,
				onActiveKeysChange: rawOnActiveKeysChange,
				onFocusKeyChange
			}),
		[activeKey, activeKeys, data, multiple, rawOnActiveKeyChange, rawOnActiveKeysChange, setState, onFocusKeyChange]
	)

	useEffect(() => {
		runKeyDown(keyCommand)
	}, [keyCommand, runKeyDown])

	useEffect(() => {
		runUpdateActive(rawActiveKey)
	}, [rawActiveKey, runUpdateActive])

	useEffect(() => {
		runUpdateActiveKeys(rawActiveKeys)
	}, [rawActiveKeys, runUpdateActiveKeys])

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
			onActiveKeyChange={onActiveKeyChange}
			onActiveKeysChange={onActiveKeysChange}
			onKeyDown={onKeyDown}
			onVisibleChange={onVisibleChange}
			type={type}
			visible={isVisible}
		/>
	)
}
