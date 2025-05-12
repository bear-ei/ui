import Animated from 'react-native-reanimated'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {Container, Danger} from './List-after-affordance.styles'

const AnimatedDanger = Animated.createAnimatedComponent(Danger)
export const renderListAfterAffordance = ({
	dangerAnimatedStyle,
	doubleConfirmed,
	id,
	onCancel,
	onConfirm,
	primaryButtonProps,
	secondaryButtonProps,
	testID,
	theme,
	visible,
	...containerProps
}: RenderListAfterAffordanceProps) => {
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
			pointerEvents={visible ? 'auto' : 'none'}
			testID={testID ?? `listAfterAffordance--${id}`}
		>
			<ListAffordanceButton
				{...(doubleConfirmed && {icon: checkIconElement})}
				{...{labelText: 'Confirm', ...primaryButtonProps}}
				onPressOut={onConfirm}
				testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
				visible={visible}
			/>

			<ListAffordanceButton
				{...(doubleConfirmed && {icon: closeIconElement})}
				{...{labelText: 'Cancel', ...secondaryButtonProps}}
				onPressOut={onCancel}
				testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
				visible={visible}
			/>

			<AnimatedDanger
				pointerEvents='none'
				style={[dangerAnimatedStyle]}
				testID={`listAfterAffordance__animatedDanger--${id}`}
			/>
		</Container>
	)
}
