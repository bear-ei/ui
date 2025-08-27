import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {
	clearMenuEvent,
	handleMenuKeyDown,
	handleMenuKeyDownEvent,
	updateMenuActive,
	updateMenuActives,
	updateMenuVisibility
} from './Menu.handler'
import type {MenuBaseProps, MenuState} from './Menu.interface'
import {RenderMenu} from './Menu.render'

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
			onVisible: rawOnVisible,
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
				nextActiveEvent,
				nextActivesEvent,
				nextVisibleEvent,
				visible: isVisible
			},
			setState
		] = useImmer<MenuState>({})

		const id = useId()
		const onActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
		const onActives = useMemo(() => updateMenuActives(setState)(rawOnActives), [rawOnActives, setState])
		const onKeyDown = useMemo(() => handleMenuKeyDownEvent(data)(setState), [data, setState])
		const onVisible = useMemo(() => updateMenuVisibility(setState)(rawOnVisible), [rawOnVisible, setState])
		const runUpdateActive = useMemo(() => updateMenuActive(setState)(rawOnActive), [rawOnActive, setState])
		const runUpdateActives = useMemo(
			() => updateMenuActives(setState)(rawOnActives),
			[rawOnActives, setState]
		)

		const runUpdateVisible = useMemo(
			() => updateMenuVisibility(setState)(rawOnVisible),
			[rawOnVisible, setState]
		)

		const runKeyDown = useMemo(
			() =>
				handleMenuKeyDown({
					activeKey,
					activeKeys,
					data,
					multiple,
					onActive: rawOnActive,
					onActives: rawOnActives
				})(setState),
			[activeKey, activeKeys, data, multiple, rawOnActive, rawOnActives, setState]
		)

		const runClearMenuEvent = useMemo(() => clearMenuEvent(setState), [setState])

		useEffect(() => {
			runKeyDown(keyCode)
		}, [keyCode, runKeyDown])

		useEffect(() => {
			runUpdateActive(rawActiveKey ?? defaultActiveKey)
		}, [defaultActiveKey, rawActiveKey, runUpdateActive])

		useEffect(() => {
			runUpdateActives(rawActiveKeys ?? defaultActiveKeys)
		}, [defaultActiveKeys, rawActiveKeys, runUpdateActives])

		useEffect(() => {
			runUpdateVisible(rawIsVisible ?? defaultVisible)
		}, [defaultVisible, rawIsVisible, runUpdateVisible])

		useEffect(() => {
			runAfterInteractions(nextVisibleEvent)()
		}, [nextVisibleEvent])

		useEffect(() => {
			runAfterInteractions(nextActivesEvent)()
		}, [nextActivesEvent])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		useEffect(() => runClearMenuEvent, [runClearMenuEvent])

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
				visible={isVisible}
			/>
		)
	}
)
