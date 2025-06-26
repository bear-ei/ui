import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import type {PressableType} from '../../Touchable'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import {
	confirmListItemAffordanceAction,
	handleListItemStateChange,
	maybeTriggerListItemClose,
	triggerListItemTrailingActions,
	updateListItemAfterAffordanceExpanded,
	updateListItemFocusState,
	updateListItemTrailingVisible
} from './List-item.handler'
import type {ListItemBaseProps, ListItemState} from './List-item.interface'
import {RenderListItem, RenderListItemTrailing} from './List-item.render'
import {useListItemAnimated} from './use-list-item-animated.hook'

export const ListItemBase = forwardRef<PressableType, ListItemBaseProps>(
	(
		{
			activeKey,
			activeKeys,
			activeTriggerEvenName = ACTIVE_TRIGGER_EVEN_NAME.PRESS_OUT,
			afterAffordance,
			afterAffordanceActiveKey,
			close,
			closeTrailing,
			disabled,
			enableUnderlay = true,
			enableUnderlayActive = true,
			focusedIndex,
			indexKey,
			itemIndex,
			leading,
			onActive,
			onActiveAfterAffordance,
			onClose: rawOnClose,
			onConfirm: rawOnConfirm,
			onLoadEnd,
			selectType,
			shape,
			supporting,
			trailing,
			trailingProps,
			trailingTriggerEvenName,
			type = LIST_TYPE.STANDARD,
			...renderListItemProps
		},
		ref
	) => {
		const [
			{
				afterAffordanceExpanded: isAfterAffordanceExpanded,
				eventName,
				nextLayoutEvent,
				nextPressInEvent,
				nextPressOutEvent,
				status,
				trailingVisible: isTrailingVisible
			},
			setState
		] = useImmer<ListItemState>({status: COMPONENT_STATUS.IDLE, afterAffordanceExpanded: false})

		const id = useId()
		const pressableRef = useRef<PressableType>(null)
		const isAfterAffordanceVisible = afterAffordanceActiveKey === indexKey
		const isActive = !!(selectType === LIST_SELECT_TYPE.SINGLE ?
			activeKey === indexKey
		:	indexKey && activeKeys?.includes(indexKey))

		const onItemClose = useMemo(
			() => maybeTriggerListItemClose(rawOnClose)(indexKey),
			[indexKey, rawOnClose]
		)

		const onTrailingVisible = useMemo(() => updateListItemTrailingVisible(setState), [setState])

		const onConfirm = useMemo(
			() =>
				confirmListItemAffordanceAction({
					onActiveAfterAffordance,
					onConfirm: rawOnConfirm,
					onItemClose
				}),
			[onActiveAfterAffordance, onItemClose, rawOnConfirm]
		)

		const onTrailingPressOut = useMemo(
			() =>
				triggerListItemTrailingActions({
					afterAffordance,
					closeTrailing,
					onActiveAfterAffordance,
					onItemClose
				})(indexKey),
			[afterAffordance, closeTrailing, indexKey, onActiveAfterAffordance, onItemClose]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (_state: State) => (event: StateEvent) =>
				handleListItemStateChange({
					...options,
					activeTriggerEvenName,
					indexKey,
					itemIndex,
					onActive,
					onLoadEnd,
					selectType,
					trailingTriggerEvenName,
					type
				})(setState)(event),
			[
				activeTriggerEvenName,
				indexKey,
				itemIndex,
				onActive,
				onLoadEnd,
				selectType,
				setState,
				trailingTriggerEvenName,
				type
			]
		)

		// console.info(trailingTriggerEvenName, 'trailingTriggerEvenName')

		const interactionHandlers = useInteractionStateEvent({
			...renderListItemProps,
			disabled,
			onStateEventChange
		})

		const {contentAnimatedStyle, headlineTextAnimatedStyle} = useListItemAnimated({
			active: isActive,
			afterAffordanceVisible: isAfterAffordanceVisible,
			status
		})

		const runUpdateFocusState = useMemo(
			() => updateListItemFocusState(itemIndex)(setState),
			[itemIndex, setState]
		)

		const runMaybeTriggerClose = useMemo(
			() => maybeTriggerListItemClose(rawOnClose)(indexKey),
			[indexKey, rawOnClose]
		)

		const runUpdateAfterAffordanceVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateListItemAfterAffordanceExpanded)(setState)({
					debounceMillisecond: 400
				}),
			[setState]
		)

		const runUpdateAfterAffordanceNotVisible = useMemo(
			() => updateListItemAfterAffordanceExpanded(setState),
			[setState]
		)

		const trailingElement = useMemo(
			() =>
				[closeTrailing, afterAffordance, trailing].some(Boolean) ?
					<RenderListItemTrailing
						afterAffordance={afterAffordance}
						closeTrailing={closeTrailing}
						disabled={disabled}
						id={id}
						interactionHandlers={{onPressOut: onTrailingPressOut}}
						onTrailingVisible={onTrailingVisible}
						trailingTriggerEvenName={trailingTriggerEvenName}
						trailing={trailing}
						trailingProps={trailingProps}
					/>
				:	undefined,
			[
				afterAffordance,
				closeTrailing,
				disabled,
				id,
				onTrailingPressOut,
				onTrailingVisible,
				trailing,
				trailingProps,
				trailingTriggerEvenName
			]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as PressableType, [pressableRef])

		useEffect(() => {
			if (isAfterAffordanceVisible) {
				runUpdateAfterAffordanceVisible(isAfterAffordanceVisible)

				return
			}

			runUpdateAfterAffordanceNotVisible(isAfterAffordanceVisible)
		}, [isAfterAffordanceVisible, runUpdateAfterAffordanceNotVisible, runUpdateAfterAffordanceVisible])

		useEffect(() => {
			runUpdateFocusState(focusedIndex)
		}, [runUpdateFocusState, focusedIndex])

		useEffect(() => {
			runMaybeTriggerClose(close)
		}, [close, runMaybeTriggerClose])

		useEffect(() => {
			runAfterInteractions(nextPressInEvent)()
		}, [nextPressInEvent])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		useEffect(() => {
			runAfterInteractions(nextLayoutEvent)()
		}, [nextLayoutEvent])

		return (
			<RenderListItem
				{...renderListItemProps}
				active={isActive}
				afterAffordance={afterAffordance}
				afterAffordanceExpanded={isAfterAffordanceExpanded}
				afterAffordanceVisible={isAfterAffordanceVisible}
				contentAnimatedStyle={contentAnimatedStyle}
				disabled={disabled}
				enableUnderlay={enableUnderlay}
				enableUnderlayActive={enableUnderlayActive}
				eventName={eventName}
				headlineTextAnimatedStyle={headlineTextAnimatedStyle}
				id={id}
				indexKey={indexKey}
				interactionHandlers={interactionHandlers}
				leadingElement={leading}
				onConfirm={onConfirm}
				ref={pressableRef}
				selectType={selectType}
				shape={shape}
				supporting={supporting}
				trailingElement={trailingElement}
				trailingVisible={isTrailingVisible ?? !trailingTriggerEvenName}
				type={type}
			/>
		)
	}
)
