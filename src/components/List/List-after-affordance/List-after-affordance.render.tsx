import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {Container, Danger} from './List-after-affordance.styles'

const AnimatedDanger = Animated.createAnimatedComponent(Danger)
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
		const fill = theme.token.scheme.onPrimary
		const checkIconElement = (
			<Icon
				fill={fill}
				iconStyle={ICON_STYLE.SHARP}
				name={ICON_NAME.CHECK}
				testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`}
				type={ICON_TYPE.OUTLINED}
			/>
		)

		const closeIconElement = (
			<Icon
				fill={fill}
				iconStyle={ICON_STYLE.SHARP}
				name={ICON_NAME.CLOSE}
				testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`}
				type={ICON_TYPE.OUTLINED}
			/>
		)

		return (
			<Container
				{...containerProps}
				{...interactionHandlers}
				entry={{duration: 0}}
				lazy={true}
				ref={ref}
				testID={testID ?? `listAfterAffordance--${id}`}
				visible={visible}
			>
				<ListAffordanceButton
					{...(doubleConfirmed && {icon: checkIconElement})}
					{...{labelText: 'Confirm', ...primaryButtonProps}}
					onPressOut={onConfirm}
					testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
				/>

				<ListAffordanceButton
					{...(doubleConfirmed && {icon: closeIconElement})}
					{...{labelText: 'Cancel', ...secondaryButtonProps}}
					onPressOut={onCancel}
					testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
				/>

				<AnimatedDanger
					pointerEvents='none'
					style={[dangerAnimatedStyle]}
					testID={`listAfterAffordance__animatedDanger--${id}`}
				/>
			</Container>
		)
	}
)
