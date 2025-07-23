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
	updateTooltipVisibility
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
				createDeferredHandlerWithState(updateTooltipVisibility(onVisible))(setState)({
					debounceMillisecond: 100
				}),
			[onVisible, setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTooltipStateChange({...options, onTooltipVisible, state, triggerEvent})(event)

		const interactionHandlers = useInteractionStateEvent({
			...renderTooltipProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const runEmitTooltipSupporting = useMemo(
			() =>
				emitTooltipSupporting(id)({
					elevation,
					onVisible: onTooltipVisible,
					shape,
					supporting,
					supportingPosition,
					triggerEvent,
					type
				}),
			[elevation, id, onTooltipVisible, shape, supporting, supportingPosition, triggerEvent, type]
		)

		const runUnmountTooltipSupporting = useMemo(() => unmountTooltipSupporting(id), [id])
		const runTooltipVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateTooltipVisibility(onVisible))(setState)({
					debounceMillisecond: 100
				}),
			[onVisible, setState]
		)

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		useEffect(() => {
			containerRef.current?.measure((x, y, width, height, pageX, pageY) =>
				runEmitTooltipSupporting({
					containerLayout: {x, y, width, height, pageX, pageY},
					visible: isTooltipVisible
				})
			)
		}, [isTooltipVisible, runEmitTooltipSupporting, runUnmountTooltipSupporting])

		useEffect(() => {
			runTooltipVisible(visible ?? defaultVisible)
		}, [runTooltipVisible, visible, defaultVisible])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		useEffect(() => {
			return () => runUnmountTooltipSupporting()
		}, [runUnmountTooltipSupporting])

		return (
			<RenderTooltip
				{...renderTooltipProps}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={containerRef}
			/>
		)
	}
)
