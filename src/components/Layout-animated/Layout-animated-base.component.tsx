import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createHandler, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS, type State} from '../Common'
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
		const isLayoutVisible = useMemo(() => rawVisible ?? defaultVisible, [defaultVisible, rawVisible])
		const delay = useMemo(() => rawDelay + 50, [rawDelay])
		const onLayoutAnimatedStatus = useMemo(
			() => createHandler(handleLayoutAnimatedStatus({unmount, lazy}))(setState)(),
			[lazy, setState, unmount]
		)

		const onLayoutAnimatedLayoutVisible = useMemo(
			() =>
				createHandler(handleLayoutAnimatedLayoutVisible(onVisible))(setState)({
					debounceMillisecond: delay
				}),

			[delay, onVisible, setState]
		)

		const onLayoutAnimatedFinished = useMemo(
			() => createHandler(handleLayoutAnimatedFinished({onUnmount, unmount}))(setState)(),
			[onUnmount, setState, unmount]
		)

		const onLayoutAnimatedLayoutChange = useMemo(
			() => createHandler(handleLayoutAnimatedLayoutChange)(setState)({debounceMillisecond: 50}),
			[setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleLayoutAnimatedStateChange({
					...options,
					onLayoutChange: onLayoutAnimatedLayoutChange,
					state
				})(event),
			[onLayoutAnimatedLayoutChange]
		)

		const interactionHandlers = useStateEvent({...renderLayoutAnimatedProps, onStateEventChange})
		const {containerAnimatedStyle} = useLayoutAnimated({
			animatedType,
			entry,
			exit,
			height: layout.height ?? contentSize?.height ?? contentSize?.minHeight,
			onAnimatedFinished: onLayoutAnimatedFinished,
			opacity,
			scale,
			visible: isVisible ?? isLayoutVisible,
			width: layout.width ?? contentSize?.width ?? contentSize?.minWidth
		})

		useEffect(() => {
			onLayoutAnimatedStatus(isLayoutVisible)
		}, [isLayoutVisible, onLayoutAnimatedStatus])

		useEffect(() => {
			if (status === COMPONENT_STATUS.SUCCEEDED) {
				onLayoutAnimatedLayoutVisible(isLayoutVisible)
			}
		}, [isLayoutVisible, onLayoutAnimatedLayoutVisible, status])

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
