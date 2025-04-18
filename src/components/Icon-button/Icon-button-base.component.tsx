import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {useStateEvent} from '../../hooks'
import type {State} from '../Common'
import {
	handleIconButtonDisabled,
	handleIconButtonStateChange,
	handleIconButtonUnderlayColor,
	renderIconButtonIcon
} from './Icon-button-handle'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonBaseProps, IconButtonState} from './Icon-button.interface'
import {useIconButtonAnimated} from './use-icon-button-animated.hook'

export const IconButtonBase = forwardRef<View, IconButtonBaseProps>(
	(
		{
			disabled: rawDisabled = false,
			fill,
			icon,
			loading,
			renderIconButton,
			testID: rawTestID,
			type = ICON_BUTTON_TYPE.FILLED,
			...renderIconButtonProps
		},
		ref
	) => {
		const [{eventName}, setState] = useImmer<IconButtonState>({})
		const theme = useTheme()
		const id = useId()
		const testID = rawTestID ?? id
		const underlayColor = handleIconButtonUnderlayColor(theme)(type)
		const onIconButtonDisabled = useMemo(() => handleIconButtonDisabled(setState), [setState])
		const onStateEventChange =
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleIconButtonStateChange({...options, state})(setState)(event)

		const disabled = loading || rawDisabled
		const interactionHandlers = useStateEvent({...renderIconButtonProps, disabled, onStateEventChange})
		const {backgroundUnderlayAnimatedStyle} = useIconButtonAnimated({disabled: rawDisabled, type})
		const iconElement = renderIconButtonIcon({disabled, eventName, fill, loading, type, testID})(theme)(
			icon
		)

		useEffect(() => {
			onIconButtonDisabled(disabled)
		}, [disabled, onIconButtonDisabled])

		return renderIconButton({
			...renderIconButtonProps,
			backgroundUnderlayAnimatedStyle,
			disabled,
			eventName,
			icon: iconElement,
			interactionHandlers,
			loading,
			ref,
			testID,
			theme,
			type,
			underlayColor
		})
	}
)
