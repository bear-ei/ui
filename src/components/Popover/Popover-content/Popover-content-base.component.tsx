import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {POPOVER_TYPE, type PopoverType} from '..'
import {type State} from '../../../constants'
import {
	type HandleStateEventChangeOptions,
	type StateEvent,
	useClearComponentEvent,
	useInteractionStateEvent,
	useTheme,
	useWindowDimensions
} from '../../../hooks'
import {
	getPopoverContentPosition,
	handleMaskPressOut,
	handlePopoverContentAnimationFinished,
	handlePopoverContentStateChange,
	updatePopoverContentPosition
} from './Popover-content.handler'
import type {PopoverContentBaseProps, PopoverContentState} from './Popover-content.interface'
import {RenderPopoverContent} from './Popover-content.render'
import {DENSITY_SIZE} from '../../../theme'

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
		const [{layout, invert: isInvert, menuPosition, nextAnimationFinishedEvent}, setState] =
			useImmer<PopoverContentState>({
				layout: {width: 0, height: 0} as LayoutRectangle,
				menuPosition: {}
			})

		useClearComponentEvent(setState)

		const {width: windowWidth, height: windowHeight} = useWindowDimensions()
		const containerRef = useRef<View>(null)
		const id = useId()
		const {token} = useTheme()
		const isMenuOrPicker = (
			[POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
		).includes(type)

		const position = getPopoverContentPosition(popoverContentPosition)(isInvert)
		const popoverWidth =
			isMenuOrPicker ?
				type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
					containerLayout?.width
				:	token.density.spacing[DENSITY_SIZE.XX_SMALL] * 45
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

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		useEffect(() => {
			runUpdatePosition({visible, windowHeight, windowWidth, layout})
		}, [visible, layout, runUpdatePosition, windowHeight, windowWidth])

		useEffect(() => {
			nextAnimationFinishedEvent?.()
		}, [nextAnimationFinishedEvent])

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
				ref={containerRef}
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
