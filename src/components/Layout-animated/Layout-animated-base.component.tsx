import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {
	finalizeLayoutAnimatedVisibilityChange,
	handleLayoutAnimatedStateChange,
	updateLayoutAnimatedSizeOnChange,
	updateLayoutAnimatedStatus,
	updateLayoutAnimatedVisibility
} from './Layout-animated.handler'
import type {LayoutAnimatedBaseProps, LayoutAnimatedState} from './Layout-animated.interface'
import {useLayoutAnimated} from './use-layout-animated.hook'

export const LayoutAnimatedBase = forwardRef<View, LayoutAnimatedBaseProps>(
	(
		{
			animatedType = LAYOUT_ANIMATED.FADE,
			contentSize,
			defaultVisible,
			delay: rawDelay = 0,
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
		const delay = rawDelay + 50
		const runUpdateLayoutAnimatedStatusEffect = useMemo(
			() => createStableHandlerWithState(updateLayoutAnimatedStatus({unmount, lazy}))(setState)(),
			[lazy, setState, unmount]
		)

		const runUpdateLayoutAnimatedVisibilityEffect = useMemo(
			() =>
				createStableHandlerWithState(updateLayoutAnimatedVisibility(onVisible))(setState)({
					debounceMillisecond: delay
				}),

			[delay, onVisible, setState]
		)

		const onLayoutAnimatedVisibilityChange = useMemo(
			() =>
				createStableHandlerWithState(
					finalizeLayoutAnimatedVisibilityChange({onUnmount, unmount})
				)(setState)(),
			[onUnmount, setState, unmount]
		)

		const onLayoutAnimatedSizeOnChange = useMemo(
			() =>
				createStableHandlerWithState(updateLayoutAnimatedSizeOnChange)(setState)({
					debounceMillisecond: 50
				}),
			[setState]
		)

		const onLayoutAnimatedStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleLayoutAnimatedStateChange({
					...options,
					onLayoutChange: onLayoutAnimatedSizeOnChange,
					state
				})(event),
			[onLayoutAnimatedSizeOnChange]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderLayoutAnimatedProps,
			onStateEventChange: onLayoutAnimatedStateEventChange
		})

		const {containerAnimatedStyle} = useLayoutAnimated({
			animatedType,
			entry,
			exit,
			height: layout.height ?? contentSize?.height ?? contentSize?.minHeight,
			onAnimationFinished: onLayoutAnimatedVisibilityChange,
			opacity,
			scale,
			visible: isVisible ?? isLayoutVisible,
			width: layout.width ?? contentSize?.width ?? contentSize?.minWidth
		})

		useEffect(() => {
			runUpdateLayoutAnimatedStatusEffect(isLayoutVisible)
		}, [runUpdateLayoutAnimatedStatusEffect, isLayoutVisible])

		useEffect(() => {
			if (status === COMPONENT_STATUS.SUCCEEDED) {
				runUpdateLayoutAnimatedVisibilityEffect(isLayoutVisible)
			}
		}, [runUpdateLayoutAnimatedVisibilityEffect, isLayoutVisible, status])

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
					contentSize,
					id,
					interactionHandlers,
					layout,
					ref,
					visible: typeof isInvisible === 'boolean' ? !isInvisible : isLayoutVisible
				})
	}
)
