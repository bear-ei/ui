import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
import {
	handleLayoutAnimatedStateChange,
	handleLayoutAnimationEnd,
	updateLayoutAnimatedSizeOnChange,
	updateLayoutAnimatedStatus,
	updateLayoutAnimatedVisible
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
				nextVisibleEvent,
				status,
				unmountLayout: isUnmountLayout,
				visible: isVisible
			},
			setState
		] = useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: COMPONENT_STATUS.IDLE})

		const id = useId()
		const isLayoutVisible = rawVisible ?? defaultVisible
		const delay = rawDelay + 50
		const updateLayoutAnimatedStatusEffect = useMemo(
			() => createStableHandlerWithState(updateLayoutAnimatedStatus({unmount, lazy}))(setState)(),
			[lazy, setState, unmount]
		)

		const updateLayoutAnimatedVisibleEffect = useMemo(
			() =>
				createStableHandlerWithState(updateLayoutAnimatedVisible(onVisible))(setState)({
					debounceMillisecond: delay
				}),

			[delay, onVisible, setState]
		)

		const onLayoutAnimationEnd = useMemo(
			() => createStableHandlerWithState(handleLayoutAnimationEnd({onUnmount, unmount}))(setState)(),
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

		const interactionHandlers = useStateEvent({
			...renderLayoutAnimatedProps,
			onStateEventChange: onLayoutAnimatedStateEventChange
		})

		const {containerAnimatedStyle} = useLayoutAnimated({
			animatedType,
			entry,
			exit,
			height: layout.height ?? contentSize?.height ?? contentSize?.minHeight,
			onAnimationFinished: onLayoutAnimationEnd,
			opacity,
			scale,
			visible: isVisible ?? isLayoutVisible,
			width: layout.width ?? contentSize?.width ?? contentSize?.minWidth
		})

		useEffect(() => {
			updateLayoutAnimatedStatusEffect(isLayoutVisible)
		}, [isLayoutVisible, updateLayoutAnimatedStatusEffect])

		useEffect(() => {
			if (status === COMPONENT_STATUS.SUCCEEDED) {
				updateLayoutAnimatedVisibleEffect(isLayoutVisible)
			}
		}, [isLayoutVisible, status, updateLayoutAnimatedVisibleEffect])

		useEffect(() => {
			runAfterInteractions(nextUnmountEvent)()
		}, [nextUnmountEvent])

		useEffect(() => {
			runAfterInteractions(nextVisibleEvent)()
		}, [nextVisibleEvent])

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
