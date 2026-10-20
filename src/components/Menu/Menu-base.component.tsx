import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE} from '../Popover'
import {
	handleMenuKeyDown,
	handleMenuKeyDownEvent,
	updateMenuActive,
	updateMenuActives,
	updateMenuVisible
} from './Menu.handler'
import type {MenuBaseProps, MenuState} from './Menu.interface'
import {RenderMenu} from './Menu.render'
import {usePendingEvent} from '../../hooks'

export const MenuBase = forwardRef<View, MenuBaseProps>(
	(
		{
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
		},
		ref
	) => {
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

		usePendingEvent({
			eventKey: 'pendingActiveEvent',
			func: rawOnActive,
			pendingEvent: pendingActiveEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingActivesEvent',
			func: rawOnActives,
			pendingEvent: pendingActivesEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingFocusKeyEvent',
			func: onFocusKey,
			pendingEvent: pendingFocusKeyEvent,
			setState
		})

		usePendingEvent({
			eventKey: 'pendingVisibleEvent',
			func: rawOnVisible,
			pendingEvent: pendingVisibleEvent,
			setState
		})

		const id = useId()
		const onActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
		const onActives = useMemo(() => updateMenuActives(setState)(rawOnActives), [rawOnActives, setState])
		const onKeyDown = useMemo(
			() => handleMenuKeyDownEvent({data, onFocusKey, onActive: rawOnActive, onActives: rawOnActives})(setState),
			[data, onFocusKey, rawOnActive, rawOnActives, setState]
		)

		const onVisible = useMemo(
			() => updateMenuVisible({onVisible: rawOnVisible, type})(setState),
			[rawOnVisible, setState, type]
		)

		const runUpdateActive = onActive
		const runUpdateActives = onActives
		const runUpdateVisible = onVisible
		const runKeyDown = useMemo(
			() =>
				handleMenuKeyDown({
					activeKey,
					activeKeys,
					data,
					multiple,
					onActive: rawOnActive,
					onActives: rawOnActives,
					onFocusKey
				})(setState),
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
				ref={ref}
				type={type}
				visible={isVisible}
			/>
		)
	}
)

MenuBase.displayName = 'MenuBase'
