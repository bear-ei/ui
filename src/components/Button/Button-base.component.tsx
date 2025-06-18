import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {COMPONENT_STATUS, type State} from '../Common'
import type {PressableType} from '../Touchable'
import {BUTTON_TYPE} from './Button.enum'
import {
	getButtonUnderlayColor,
	handleButtonStateChange,
	updateButtonDisabledState,
	updateButtonStatus
} from './Button.handler'
import type {ButtonBaseProps, ButtonState} from './Button.interface'
import {RenderButton, RenderButtonIcon} from './Button.render'
import {useButtonAnimated} from './use-button-animated.hook'

export const ButtonBase = forwardRef<PressableType, ButtonBaseProps>(
	(
		{
			disabled: rawDisabled,
			error,
			icon,
			labelText = 'Label',
			loading,
			type = BUTTON_TYPE.FILLED,
			...renderButtonProps
		},
		ref
	) => {
		const [{elevation, eventName, status}, setState] = useImmer<ButtonState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const isDisabled = loading || rawDisabled
		const theme = useTheme()
		const underlayColor = getButtonUnderlayColor(theme)(type)
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleButtonStateChange({...options, state, type})(setState)(event),
			[setState, type]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderButtonProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({
			disabled: rawDisabled,
			error,
			eventName,
			type
		})

		const runUpdateStatus = useMemo(
			() => updateButtonStatus(rawDisabled)(setState),
			[rawDisabled, setState]
		)

		const runUpdateDisabledState = useMemo(
			() => updateButtonDisabledState(type)(setState),
			[setState, type]
		)

		const iconElement = useMemo(
			() => (
				<RenderButtonIcon
					disabled={rawDisabled}
					icon={icon}
					id={id}
					type={type}
				/>
			),
			[icon, id, rawDisabled, type]
		)

		useEffect(() => {
			runUpdateStatus(type)
		}, [type, runUpdateStatus])

		useEffect(() => {
			runUpdateDisabledState(isDisabled)
		}, [isDisabled, runUpdateDisabledState])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return (
			<RenderButton
				{...renderButtonProps}
				backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
				disabled={isDisabled}
				elevation={elevation}
				eventName={eventName}
				iconElement={iconElement}
				id={id}
				interactionHandlers={interactionHandlers}
				labelText={labelText}
				labelTextAnimatedStyle={labelTextAnimatedStyle}
				loading={loading}
				ref={ref}
				type={type}
				underlayColor={underlayColor}
			/>
		)
	}
)
