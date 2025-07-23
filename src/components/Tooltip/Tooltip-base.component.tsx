import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import {
	emitTooltipSupporting,
	handleMaskPressOut,
	handleTooltipContextMenu,
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
			onVisible: rawOnVisible,
			shape,
			supporting,
			supportingPosition,
			triggerEvent,
			type = TOOLTIP_TYPE.PLAIN,
			visible,
			...renderTooltipProps
		},
		ref
	) => {
		const [{tooltipVisible: isTooltipVisible, nextActiveEvent, menuContainerLayout}, setState] =
			useImmer<TooltipState>({})

		const containerRef = useRef<View>(null)
		const id = useId()
		const onVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateTooltipVisibility(rawOnVisible))(setState)({
					debounceMillisecond: 100
				}),
			[rawOnVisible, setState]
		)

		const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisible), [onVisible])
		const onContextMenu = useMemo(
			() => handleTooltipContextMenu(setState)(onVisible),
			[onVisible, setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTooltipStateChange({...options, onVisible, state, triggerEvent, type})(event)

		const interactionHandlers = useInteractionStateEvent({
			...renderTooltipProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const runEmitTooltipSupporting = useMemo(
			() =>
				emitTooltipSupporting(type)({
					elevation,
					onVisible,
					shape,
					supporting,
					supportingPosition,
					triggerEvent
				}),
			[elevation, onVisible, shape, supporting, supportingPosition, triggerEvent, type]
		)

		const runUnmountTooltipSupporting = useMemo(() => unmountTooltipSupporting(type), [type])
		const runTooltipVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateTooltipVisibility(onVisible))(setState)({
					debounceMillisecond: 100
				}),
			[onVisible, setState]
		)

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		useEffect(() => {
			if (type === TOOLTIP_TYPE.MENU) {
				runEmitTooltipSupporting({
					containerLayout: menuContainerLayout,
					visible: isTooltipVisible
				})

				return
			}

			containerRef.current?.measure((x, y, width, height, pageX, pageY) =>
				runEmitTooltipSupporting({
					containerLayout: {x, y, width, height, pageX, pageY},
					visible: isTooltipVisible
				})
			)
		}, [isTooltipVisible, menuContainerLayout, runEmitTooltipSupporting, type])

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
				onContextMenu={onContextMenu}
				onMaskPressOut={onMaskPressOut}
				ref={containerRef}
				type={type}
				visible={isTooltipVisible}
			/>
		)
	}
)
