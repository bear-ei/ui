import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {LayoutRectangle, View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {
	useInteractionStateEvent,
	useWindowDimensions,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'
import {COMPONENT_STATUS, type State} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {
	handleTooltipSupportingPositionInvert,
	handleTooltipSupportingStateChange,
	updateTooltipSupportingClosed,
	updateTooltipSupportingContainerLayout,
	updateTooltipSupportingPosition
} from './Tooltip-supporting.handler'
import type {TooltipSupportingBaseProps, TooltipSupportingState} from './Tooltip-supporting.interface'
import {RenderTooltipSupporting} from './Tooltip-supporting.render'
import {useTooltipSupportingAnimated} from './use-tooltip-supporting-animated.hook'

/**
 * TODO: ADD Layout delay
 */
export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
	({containerCurrent, onVisible, supportingPosition, type, visible, ...renderTooltipSupportingProps}, ref) => {
		const [{containerLayout, layout, status, closed: isClosed, invert: isInvert}, setState] =
			useImmer<TooltipSupportingState>({
				containerLayout: {} as TooltipSupportingState['containerLayout'],
				layout: {} as LayoutRectangle,
				status: COMPONENT_STATUS.IDLE
			})

		const {width: windowWidth, height: windowHeight} = useWindowDimensions()
		const containerRef = useRef<View>()
		const id = useId()
		const theme = useTheme()
		const tooltipSupportingWidth = type === TOOLTIP_TYPE.MENU ? containerLayout.width : layout.width
		const onTooltipSupportingClosed = useMemo(() => updateTooltipSupportingClosed(setState), [setState])
		const position = useMemo(
			() => updateTooltipSupportingPosition(supportingPosition)(isInvert),
			[isInvert, supportingPosition]
		)

		const {contentAnimatedStyle} = useTooltipSupportingAnimated({
			height: layout.height,
			onClose: onTooltipSupportingClosed,
			type,
			visible
		})

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTooltipSupportingStateChange({...options, state, onVisible})(setState)(event)

		const interactionHandlers = useInteractionStateEvent({
			...renderTooltipSupportingProps,
			onStateEventChange
		})

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		const runTooltipSupportingContainerLayout = useMemo(
			() => updateTooltipSupportingContainerLayout({setState, windowWidth})(containerCurrent),
			[containerCurrent, setState, windowWidth]
		)

		const runTooltipSupportingPositionInvert = useMemo(
			() => handleTooltipSupportingPositionInvert({setState, supportingPosition})(containerRef),
			[setState, supportingPosition]
		)

		useEffect(() => {
			runTooltipSupportingContainerLayout(visible)
		}, [runTooltipSupportingContainerLayout, visible])

		useEffect(() => {
			runTooltipSupportingPositionInvert({height: windowHeight, width: windowWidth})
		}, [runTooltipSupportingPositionInvert, windowHeight, windowWidth])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderTooltipSupporting
				{...renderTooltipSupportingProps}
				closed={isClosed}
				containerLayout={containerLayout}
				contentAnimatedStyle={contentAnimatedStyle}
				height={layout.height}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={containerRef as React.LegacyRef<View>}
				supportingPosition={position}
				theme={theme}
				type={type}
				width={tooltipSupportingWidth}
			/>
		)
	}
)
