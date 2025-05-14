import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {useStateEvent, type HandleStateEventChangeOptions, type StateEvent} from '../../hooks'
import {createStableHandlerWithState} from '../../utils'
import type {State} from '../Common'
import {handleIconButtonDisabled, handleIconButtonStateChange, processButtonUnderlayColor} from './Icon-button-handle'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {renderIconButtonIcon} from './Icon-button.render'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
	(
		{
			disabled: rawDisabled = false,
			fill,
			icon,
			loading,
			renderIconButton,
			type = ICON_BUTTON_TYPE.FILLED,
			...renderIconButtonProps
		},
		ref
	) => {
		const [{eventName}, setState] = useImmer<IconButtonState>({})
		const id = useId()
		const isDisabled = loading || rawDisabled
		const theme = useTheme()
		const underlayColor = processButtonUnderlayColor(theme)(type)
		const onIconButtonDisabled = useMemo(
			() => createStableHandlerWithState(handleIconButtonDisabled)(setState)(),
			[setState]
		)

		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleIconButtonStateChange({...options, state})(setState)(event),
			[setState]
		)

		const interactionHandlers = useStateEvent({
			...renderIconButtonProps,
			disabled: isDisabled,
			onStateEventChange
		})

		const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
		const iconElement = useMemo(
			() =>
				renderIconButtonIcon({disabled: isDisabled, eventName, fill, loading, type, id})(theme)(
					icon
				),
			[eventName, fill, icon, id, isDisabled, loading, theme, type]
		)

		useEffect(() => {
			onIconButtonDisabled(isDisabled)
		}, [isDisabled, onIconButtonDisabled])

		return renderIconButton({
			...renderIconButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled: isDisabled,
			eventName,
			icon: iconElement,
			id,
			interactionHandlers,
			loading,
			ref,
			theme,
			type,
			underlayColor
		})
	}
)
