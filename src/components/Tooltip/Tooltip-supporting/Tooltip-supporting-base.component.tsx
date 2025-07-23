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

export const TooltipSupportingBase = forwardRef<View, TooltipSupportingBaseProps>(
	(
		{
			containerLayout,
			onVisible,
			supportingPosition,
			triggerEvent,
			type,
			visible: isVisible,
			...renderTooltipSupportingProps
		},
		ref
	) => {
		const [{layout, status, invert: isInvert}, setState] = useImmer<TooltipSupportingState>({
			layout: {} as LayoutRectangle,
			status: COMPONENT_STATUS.IDLE
		})

		const {width: windowWidth, height: windowHeight} = useWindowDimensions()
		const containerRef = useRef<View>()
		const id = useId()
		const theme = useTheme()
		const tooltipSupportingWidth =
			type === TOOLTIP_TYPE.MENU ? theme.adaptSize(theme.token.spacing.extraSmall * 45) : layout.width

		const onClosed = useMemo(() => updateTooltipSupportingClosed(setState), [setState])
		const position = useMemo(
			() => updateTooltipSupportingPosition(supportingPosition)(isInvert),
			[isInvert, supportingPosition]
		)

		const {contentAnimatedStyle} = useTooltipSupportingAnimated({
			height: layout.height,
			onClose: onClosed,
			status,
			type,
			visible: isVisible
		})

		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleTooltipSupportingStateChange({...options, state, onVisible, triggerEvent})(
					setState
				)(event)

		const interactionHandlers = useInteractionStateEvent({
			...renderTooltipSupportingProps,
			onStateEventChange
		})

		useImperativeHandle(ref, () => (containerRef?.current ?? {}) as View, [])

		const runContainerLayout = useMemo(
			() => updateTooltipSupportingContainerLayout({setState, windowWidth})(containerLayout),
			[containerLayout, setState, windowWidth]
		)

		const runPositionInvert = useMemo(
			() => handleTooltipSupportingPositionInvert({setState, supportingPosition})(containerRef),
			[setState, supportingPosition]
		)

		useEffect(() => {
			runContainerLayout(isVisible)
		}, [runContainerLayout, isVisible])

		useEffect(() => {
			runPositionInvert({
				height: windowHeight,
				visible: isVisible,
				width: windowWidth
			})
		}, [isVisible, runPositionInvert, windowHeight, windowWidth])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderTooltipSupporting
				{...renderTooltipSupportingProps}
				containerLayout={containerLayout}
				contentAnimatedStyle={contentAnimatedStyle}
				height={layout.height}
				id={id}
				interactionHandlers={interactionHandlers}
				ref={containerRef as React.LegacyRef<View>}
				supportingPosition={position}
				theme={theme}
				type={type}
				visible={isVisible}
				width={tooltipSupportingWidth}
			/>
		)
	}
)
