import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useInteractionStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import type {State} from '../Common'
import type {PressableType} from '../Touchable'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import {getButtonUnderlayColor, handleIconButtonStateChange, updateIconButtonDisabledState} from './Icon-button.handler'
import type {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {RenderIconButton, RenderIconButtonIcon} from './Icon-button.render'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<PressableType, IconButtonBaseProps>(
	(
		{
			disabled: rawDisabled = false,
			fill,
			icon,
			loading,
			type = ICON_BUTTON_TYPE.FILLED,
			...renderIconButtonProps
		},
		ref
	) => {
		const [{eventName}, setState] = useImmer<IconButtonState>({})
		const id = useId()
		const isDisabled = loading || rawDisabled
		const theme = useTheme()
		const underlayColor = getButtonUnderlayColor(theme)(type)
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleIconButtonStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useInteractionStateEvent({
			...renderIconButtonProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
		const runUpdateDisabledState = useMemo(() => updateIconButtonDisabledState(setState), [setState])
		const iconElement = useMemo(
			() => (
				<RenderIconButtonIcon
					disabled={isDisabled}
					eventName={eventName}
					fill={fill}
					icon={icon}
					id={id}
					loading={loading}
					type={type}
				/>
			),
			[eventName, fill, icon, id, isDisabled, loading, type]
		)

		useEffect(() => {
			runUpdateDisabledState(isDisabled)
		}, [runUpdateDisabledState, isDisabled])

		return (
			<RenderIconButton
				{...renderIconButtonProps}
				backgroundUnderlayAnimatedStyle={backgroundUnderlayAnimatedStyle}
				disabled={isDisabled}
				eventName={eventName}
				iconElement={iconElement}
				id={id}
				interactionHandlers={interactionHandlers}
				loading={loading}
				ref={ref}
				type={type}
				underlayColor={underlayColor}
			/>
		)
	}
)
