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
	handleTooltipStateChange,
	unmountTooltipSupporting,
	updateTooltipContextMenuLayout,
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
			() => updateTooltipContextMenuLayout(setState)(onVisible),
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

		const runEmit = useMemo(
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

		const runUnmount = useMemo(() => unmountTooltipSupporting(type), [type])
		const runUpdateVisible = useMemo(
			() =>
				createDeferredHandlerWithState(updateTooltipVisibility(onVisible))(setState)({
					debounceMillisecond: 100
				}),
			[onVisible, setState]
		)

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		useEffect(() => {
			if (type === TOOLTIP_TYPE.MENU) {
				runEmit({containerLayout: menuContainerLayout, visible: isTooltipVisible})

				return
			}

			containerRef.current?.measure((x, y, width, height, pageX, pageY) =>
				runEmit({
					containerLayout: {x, y, width, height, pageX, pageY},
					visible: isTooltipVisible
				})
			)
		}, [isTooltipVisible, menuContainerLayout, runEmit, type])

		useEffect(() => {
			runUpdateVisible(visible ?? defaultVisible)
		}, [runUpdateVisible, visible, defaultVisible])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		useEffect(() => {
			return () => runUnmount()
		}, [runUnmount])

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
