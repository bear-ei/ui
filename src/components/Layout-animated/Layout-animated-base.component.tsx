import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import {debounce, runAfterInteractions} from '../../utils'
import type {State} from '../Common'
import {
	handleLayoutAnimatedFinished,
	handleLayoutAnimatedLayoutChange,
	handleLayoutAnimatedLayoutVisible,
	handleLayoutAnimatedStateChange,
	handleLayoutAnimatedStatus
} from './Layout-animated-handle'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'
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
			{layout, visible, invisible, nextUnmountEvent, nextVisibleEvent, status, unmountLayout},
			setState
		] = useImmer<LayoutAnimatedState>({layout: {} as LayoutRectangle, status: 'idle'})

		const id = useId()
		const isLayoutVisible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
		const delay = useMemo(() => rawDelay + 50, [rawDelay])
		const onLayoutAnimatedLayoutVisible = useMemo(
			() => debounce(handleLayoutAnimatedLayoutVisible({setState, onVisible}))(delay),
			[delay, onVisible, setState]
		)

		const onLayoutAnimatedFinished = useMemo(
			() => handleLayoutAnimatedFinished({onUnmount, unmount})(setState),
			[onUnmount, setState, unmount]
		)

		const onLayoutAnimatedStatus = useMemo(
			() => handleLayoutAnimatedStatus({unmount, lazy})(setState),
			[lazy, setState, unmount]
		)

		const onLayoutAnimatedLayoutChange = useMemo(
			() => debounce(handleLayoutAnimatedLayoutChange(setState))(50),
			[setState]
		)

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleLayoutAnimatedStateChange({
					...options,
					onLayoutChange: onLayoutAnimatedLayoutChange,
					state
				})(event)

		const interactionHandlers = useStateEvent({...renderLayoutAnimatedProps, onStateEventChange})
		const {containerAnimatedStyle} = useLayoutAnimated({
			animatedType,
			entry,
			exit,
			height: layout.height ?? contentSize?.height ?? contentSize?.minHeight,
			onAnimatedFinished: onLayoutAnimatedFinished,
			opacity,
			scale,
			visible: visible ?? isLayoutVisible,
			width: layout.width ?? contentSize?.width ?? contentSize?.minWidth
		})

		useEffect(() => {
			onLayoutAnimatedStatus(isLayoutVisible)
		}, [isLayoutVisible, onLayoutAnimatedStatus])

		useEffect(() => {
			nextUnmountEvent?.()
		}, [nextUnmountEvent])

		useEffect(() => {
			if (status === 'succeeded') {
				onLayoutAnimatedLayoutVisible(isLayoutVisible)
			}
		}, [isLayoutVisible, onLayoutAnimatedLayoutVisible, status])

		useEffect(() => {
			runAfterInteractions(nextVisibleEvent)()
		}, [nextVisibleEvent])

		if (status === 'idle') {
			return <></>
		}

		return unmountLayout ?
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
					visible: typeof invisible === 'boolean' ? !invisible : isLayoutVisible
				})
	}
)
