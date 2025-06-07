import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {
	finalizeLayoutAnimatedVisibilityChange,
	handleLayoutAnimatedStateChange,
	updateLayoutAnimatedSize,
	updateLayoutAnimatedStatus,
	updateLayoutAnimatedVisibility
} from './Layout-animated.handler'
import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
	(
		{
			animatedType = LAYOUT_ANIMATED.FADE,
			defaultVisible,
			entry,
			exit,
			lazy = false,
			onUnmount,
			onVisible,
			opacity,
			renderLayoutAnimated,
			scale = false,
			unmount,
			visible: rawVisible,
			contentSize: rawContentSize,
			...renderLayoutAnimatedProps
		},
		ref
	) => {
		const [
			{
				invisible: isInvisible,
				layout,
				nextUnmountEvent,
				nextVisibilityEvent,
				status,
				unmountLayout: isUnmountLayout,
				visible: isVisible
			},
			setState
		] = useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE})

		const id = useId()
		const isLayoutVisible = rawVisible ?? defaultVisible
		const contentSize = useMemo(
			() =>
				typeof rawContentSize === 'number' ?
					{width: rawContentSize, height: rawContentSize}
				:	rawContentSize,
			[rawContentSize]
		)

		const onAnimationFinished = useMemo(
			() => finalizeLayoutAnimatedVisibilityChange({onUnmount, unmount})(setState),
			[onUnmount, setState, unmount]
		)

		const onLayoutChange = useMemo(() => updateLayoutAnimatedSize(setState), [setState])
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleLayoutAnimatedStateChange({...options, onLayoutChange, state})(event),
			[onLayoutChange]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderLayoutAnimatedProps,
			onStateEventChange
		})

		const {containerAnimatedStyle} = useLayoutAnimated({
			animatedType,
			entry,
			exit,
			height: layout.height ?? contentSize?.height,
			onAnimationFinished,
			opacity,
			scale,
			visible: isVisible ?? isLayoutVisible,
			width: layout.width ?? contentSize?.width
		})

		const runUpdateStatus = useMemo(
			() => updateLayoutAnimatedStatus({unmount, lazy})(setState),
			[lazy, setState, unmount]
		)

		const runUpdateVisibility = useMemo(
			() =>
				createDeferredHandlerWithState(updateLayoutAnimatedVisibility(onVisible))(setState)({
					debounceMillisecond: 50
				}),
			[onVisible, setState]
		)

		useEffect(() => {
			runUpdateStatus(isLayoutVisible)
		}, [runUpdateStatus, isLayoutVisible])

		useEffect(() => {
			if (status === COMPONENT_STATUS.SUCCEEDED) {
				runUpdateVisibility(isLayoutVisible)
			}
		}, [runUpdateVisibility, isLayoutVisible, status])

		useEffect(() => {
			runAfterInteractions(nextUnmountEvent)()
		}, [nextUnmountEvent])

		useEffect(() => {
			runAfterInteractions(nextVisibilityEvent)()
		}, [nextVisibilityEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return isUnmountLayout ?
				<></>
			:	renderLayoutAnimated({
					...renderLayoutAnimatedProps,
					animatedType,
					containerAnimatedStyle,
					id,
					interactionHandlers,
					layout,
					ref,
					status,
					visible: typeof isInvisible === 'boolean' ? !isInvisible : isLayoutVisible,
					contentSize
				})
	}
)
