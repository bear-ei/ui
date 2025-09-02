import {forwardRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_TYPE} from '../../Icon'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {Container, Danger} from './List-after-affordance.styles'

export const RenderListAfterAffordance = forwardRef<View, RenderListAfterAffordanceProps>(
	(
		{
			dangerAnimatedStyle,
			doubleConfirmed,
			id,
			interactionHandlers,
			onCancel,
			onConfirm,
			primaryButtonProps,
			secondaryButtonProps,
			testID,
			visible,
			...containerProps
		}: RenderListAfterAffordanceProps,
		ref
	) => {
		const theme = useTheme()
		const buttonTabIndex = visible ? 0 : -1
		const fill = theme.token.scheme.onPrimary
		const isDangerVisible = !secondaryButtonProps?.disabled
		const checkIconElement = (
			<Icon
				fill={fill}
				name={ICON_NAME.CHECK}
				testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`}
				type={ICON_TYPE.OUTLINED}
			/>
		)

		const closeIconElement = (
			<Icon
				fill={fill}
				name={ICON_NAME.CLOSE}
				testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`}
				type={ICON_TYPE.OUTLINED}
			/>
		)

		return (
			<Container
				{...containerProps}
				{...interactionHandlers}
				disabled={!isDangerVisible}
				entry={{duration: 0}}
				lazy={true}
				ref={ref}
				testID={testID ?? `listAfterAffordance--${id}`}
				visible={visible}
			>
				<ListAffordanceButton
					{...(doubleConfirmed && {icon: checkIconElement})}
					{...{labelText: 'Confirm', ...primaryButtonProps}}
					backgroundVisible={!isDangerVisible}
					onPressOut={onConfirm}
					tabIndex={buttonTabIndex}
					testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
				/>

				<ListAffordanceButton
					{...(doubleConfirmed && {icon: closeIconElement})}
					{...{labelText: 'Cancel', ...secondaryButtonProps}}
					backgroundVisible={false}
					onPressOut={onCancel}
					tabIndex={buttonTabIndex}
					testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
				/>

				<Danger
					style={[dangerAnimatedStyle]}
					testID={`listAfterAffordance__animatedDanger--${id}`}
					visible={isDangerVisible}
				/>
			</Container>
		)
	}
)
