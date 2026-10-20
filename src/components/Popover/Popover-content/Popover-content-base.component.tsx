import {forwardRef, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {type LayoutRectangle, type View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE, type PopoverType} from '..'
import {type State} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	useTheme,
	useWindowDimensions,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'
import {DENSITY_SIZE, UI_DENSITY} from '../../../theme'
import {
	getPopoverContentPosition,
	handleMaskPressOut,
	handlePopoverContentAnimationFinished,
	handlePopoverContentStateChange,
	updatePopoverContentPosition
} from './Popover-content.handler'
import type {PopoverContentBaseProps, PopoverContentState} from './Popover-content.interface'
import {RenderPopoverContent} from './Popover-content.render'

export const PopoverContentBase = forwardRef<View, PopoverContentBaseProps>(
	(
		{
			containerLayout,
			onAnimationFinished: rawOnAnimationFinished,
			onVisible,
			popoverContentPosition,
			triggerEvent,
			type = POPOVER_TYPE.TOOLTIP,
			visible,
			...renderPopoverContentProps
		},
		ref
	) => {
		const [{layout, invert: isInvert, menuPosition, pendingAnimationFinishedEvent}, setState] =
			useImmer<PopoverContentState>({layout: {} as Partial<LayoutRectangle>, menuPosition: {}})

		usePendingEvent({
			eventKey: 'pendingAnimationFinishedEvent',
			func: rawOnAnimationFinished,
			pendingEvent: pendingAnimationFinishedEvent,
			setState
		})

		const {width: windowWidth, height: windowHeight} = useWindowDimensions()
		const containerRef = useRef<View>(null)
		const mergedRef = useMergeRefs([ref, containerRef])
		const id = useId()
		const {token, uiDensity} = useTheme()
		const isMenuOrPicker = (
			[POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
		).includes(type)

		const position = getPopoverContentPosition(popoverContentPosition)(isInvert)

		// Menu width targets 180px on both densities:
		// desktop (spacing.XX_SMALL = 2) × 90, mobile (4) × 45.
		const popoverWidth =
			isMenuOrPicker ?
				type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
					containerLayout?.width
				:	token.density.spacing[DENSITY_SIZE.XX_SMALL] * (uiDensity === UI_DENSITY.COMPACT ? 90 : 45)
			:	layout.width

		const onAnimationFinished = useMemo(
			() => handlePopoverContentAnimationFinished(rawOnAnimationFinished)(setState),
			[rawOnAnimationFinished, setState]
		)

		const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisible), [onVisible])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handlePopoverContentStateChange({...options, state, onVisible, triggerEvent})(setState)(event),
			[onVisible, setState, triggerEvent]
		)

		const interactionHandlers = useInteractionStateEvent({...renderPopoverContentProps, onStateEventChange})
		const runUpdatePosition = useMemo(
			() =>
				updatePopoverContentPosition({containerLayout, popoverContentPosition, setState, token, type})(
					containerRef
				),
			[containerLayout, setState, popoverContentPosition, token, type]
		)

		useEffect(() => {
			let isCancelled = false

			runUpdatePosition({visible, windowHeight, windowWidth, layout, isCancelled: () => isCancelled})

			return () => {
				isCancelled = true
			}
		}, [visible, layout, runUpdatePosition, windowHeight, windowWidth])

		return (
			<RenderPopoverContent
				{...renderPopoverContentProps}
				containerLayout={containerLayout}
				height={layout.height}
				id={id}
				interactionHandlers={interactionHandlers}
				menuPosition={menuPosition}
				onAnimationFinished={onAnimationFinished}
				onMaskPressOut={onMaskPressOut}
				popoverContentPosition={position}
				ref={mergedRef}
				type={type}
				visible={visible}
				width={popoverWidth}
				windowHeight={windowHeight}
				windowWidth={windowWidth}
			/>
		)
	}
)

PopoverContentBase.displayName = 'PopoverContentBase'
