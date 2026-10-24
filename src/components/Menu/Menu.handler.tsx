import type {TextInputKeyPressEvent} from 'react-native'
import type {Updater} from 'use-immer'

import type {
	HandleMenuKeyDownEventOptions,
	HandleMenuKeyCommandOptions,
	MenuState,
	UpdateMenuVisibleOptions
} from './Menu.interface'

import {isArrayEqual} from '../../utils'
import {POPOVER_TYPE} from '../Popover'

const handleMenuActiveKeys = (key: string, activeKeys: string[] = []) => {
	if (activeKeys.findIndex(item => item === key) !== -1) {
		return activeKeys.filter(item => item !== key)
	}

	return [...activeKeys, key]
}

export const handleMenuKeyCommand =
	(
		setState: Updater<MenuState>,
		{
			activeKey,
			activeKeys,
			data,
			multiple,
			onActiveKeyChange,
			onActiveKeysChange,
			onFocusKeyChange
		}: HandleMenuKeyCommandOptions
	) =>
	(keyCommand?: string) => {
		if (!data) {
			return
		}

		setState(draft => {
			const currentFocusedIndex = draft.focusedIndex ?? -1
			const lastIndex = data.length - 1
			const focusData =
				typeof currentFocusedIndex === 'number' && currentFocusedIndex !== -1 ?
					data[currentFocusedIndex]
				:	undefined

			switch (true) {
				case keyCommand?.startsWith('ArrowUp'): {
					const nextFocusedIndex = currentFocusedIndex - 1 < 0 ? lastIndex : currentFocusedIndex - 1

					draft.focusedIndex = nextFocusedIndex

					if (onFocusKeyChange) {
						draft.pendingFocusKeyEvent = data[nextFocusedIndex]?.itemKey
					}

					break
				}

				case keyCommand?.startsWith('ArrowDown'): {
					const nextFocusedIndex = currentFocusedIndex + 1 > lastIndex ? 0 : currentFocusedIndex + 1

					draft.focusedIndex = nextFocusedIndex

					if (onFocusKeyChange) {
						draft.pendingFocusKeyEvent = data[nextFocusedIndex]?.itemKey
					}

					break
				}

				case keyCommand?.startsWith('Enter'):
					if (!focusData || typeof draft.focusedIndex !== 'number') {
						break
					}

					if (onActiveKeysChange && multiple) {
						draft.pendingActiveKeysEvent = handleMenuActiveKeys(focusData.itemKey, activeKeys)

						break
					}

					if (onActiveKeyChange) {
						draft.pendingActiveEvent = focusData.itemKey === activeKey ? undefined : focusData.itemKey
					}

					break

				default:
					break
			}
		})
	}

export const handleMenuKeyDownEvent =
	(setState: Updater<MenuState>, options: HandleMenuKeyDownEventOptions) =>
	(event: React.KeyboardEvent | TextInputKeyPressEvent) => {
		const key = event.nativeEvent.key

		if (key === 'ArrowUp' || key === 'ArrowDown') {
			event.preventDefault()
		}

		// Ignore key-repeat events (holding Enter / ArrowUp / ArrowDown down).
		// `nativeEvent.repeat` is a DOM standard property available on RNW's
		// KeyboardEvent. RN's TextInputKeyPressEvent doesn't have `repeat`,
		// so native falls through to the `draft.keyCommand` dedupe below.
		const isKeyRepeat =
			'nativeEvent' in event &&
			'repeat' in event.nativeEvent &&
			(event.nativeEvent as {repeat?: boolean}).repeat === true

		if (isKeyRepeat) {
			return
		}

		handleMenuKeyCommand(setState, options)(key)
	}

export const updateMenuVisible =
	(setState: Updater<MenuState>, {onVisibleChange, type}: UpdateMenuVisibleOptions) =>
	(visible?: boolean) => {
		if (visible === undefined) {
			return
		}

		setState(draft => {
			if (!visible) {
				draft.focusedIndex = undefined

				if (type === POPOVER_TYPE.CONTEXT_MENU) {
					draft.activeKey = undefined
				}
			}

			if (draft.visible !== visible && onVisibleChange) {
				draft.pendingVisibleEvent = visible
			}

			draft.visible = visible
		})
	}

export const updateMenuActive =
	(setState: Updater<MenuState>, onActiveKeyChange?: (itemKey: string) => void) => (itemKey?: string) => {
		if (itemKey === undefined) {
			return
		}

		setState(draft => {
			if (draft.activeKey !== itemKey && onActiveKeyChange) {
				draft.pendingActiveEvent = itemKey
			}

			draft.activeKey = itemKey
		})
	}

export const updateMenuActiveKeys =
	(setState: Updater<MenuState>, onActiveKeysChange?: (activeKeys?: string[]) => void) => (activeKeys?: string[]) => {
		if (activeKeys === undefined) {
			return
		}

		setState(draft => {
			const isActiveKeysEqual = isArrayEqual([...(draft.activeKeys ?? [])], activeKeys)

			if (!isActiveKeysEqual && onActiveKeysChange) {
				draft.pendingActiveKeysEvent = activeKeys
			}

			draft.activeKeys = activeKeys
		})
	}
