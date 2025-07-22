import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {
	emitTooltipSupporting,
	handleTooltipStateChange,
	unmountTooltipSupporting,
	updateTooltipVisible
} from './Tooltip.handler'
import type {TooltipBaseProps, TooltipState} from './Tooltip.interface'
import {RenderTooltip} from './Tooltip.render'

export const TooltipBase = forwardRef<View, TooltipBaseProps>(
	(
		{
			defaultVisible,
			disabled: isDisabled = false,
			elevation,
			onVisible,
			shape,
			supporting,
			supportingPosition,
			triggerEvent,
			type,
			visible,
			...renderTooltipProps
		},
		ref
	) => {
		const [{tooltipVisible: isTooltipVisible, nextActiveEvent}, setState] = useImmer<TooltipState>({})
		const containerRef = useRef<View>(null)
		const id = useId()
		const onTooltipVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateTooltipVisible(onVisible))(setState)({
					debounceMillisecond: 300
				}),
			[onVisible, setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTooltipStateChange({
					...options,
					onTooltipVisible,
					state,
					triggerEvent
				})(event)

		const interactionHandlers = useInteractionStateEvent({
			...renderTooltipProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const runEmitTooltipSupporting = useMemo(
			() =>
				emitTooltipSupporting(id)({
					containerCurrent: containerRef.current,
					elevation,
					onVisible: onTooltipVisible,
					shape,
					supporting,
					supportingPosition,
					type,
					visible: isTooltipVisible
				}),
			[elevation, id, isTooltipVisible, onTooltipVisible, shape, supporting, supportingPosition, type]
		)

		const runUnmountTooltipSupporting = useMemo(() => unmountTooltipSupporting(id), [id])

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		useEffect(() => {
			runEmitTooltipSupporting()

			return () => runUnmountTooltipSupporting()
		}, [runEmitTooltipSupporting, runUnmountTooltipSupporting])

		useEffect(() => {
			onTooltipVisible(visible ?? defaultVisible)
		}, [onTooltipVisible, visible, defaultVisible])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		return (
			<RenderTooltip
				{...renderTooltipProps}
				id={id}
				interactionHandlers={interactionHandlers}
			/>
		)
	}
)
