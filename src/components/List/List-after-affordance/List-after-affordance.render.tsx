import {Check, X} from 'lucide-react-native'
import {forwardRef, useMemo} from 'react'
import type {View, ViewStyle} from 'react-native'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DURATION, EASING, UI_DENSITY} from '../../../theme'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../../Layout-animated'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const RenderListAfterAffordance = forwardRef<View, RenderListAfterAffordanceProps>(
	(
		{
			dangerAnimatedStyle,
			phase,
			id,
			interactionHandlers,
			onSecondaryAction,
			onConfirm,
			primaryButtonDisabled,
			primaryButtonLabelText = 'Edit',
			primaryButtonLoading,
			primaryButtonStyle,
			secondaryButtonDisabled,
			secondaryButtonLabelText = 'Del',
			secondaryButtonLoading,
			secondaryButtonStyle,
			size = DENSITY_SIZE.MEDIUM,
			testID,
			visible,
			...containerProps
		}: RenderListAfterAffordanceProps,
		ref
	) => {
		const {token, uiDensity} = useTheme()
		const {classesName} = token.classes
		const buttonTabIndex = visible ? 0 : -1
		const checkIconElement = <Check testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`} />
		const closeIconElement = <X testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`} />

		// Secondary button carries the destructive action (delete).
		// When it's disabled, fall back to the disabled style and hide the danger block.
		const isDangerVisible = !secondaryButtonDisabled
		const listAfterAffordanceStyle = {flexDirection: 'row'} as ViewStyle
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
				exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
			}),
			[]
		)

		return (
			<LayoutAnimated
				{...containerProps}
				{...interactionHandlers}
				animatedType={LAYOUT_ANIMATED.FADE}
				className={classesName('relative flex self-stretch', {
					['bg-[--color-primary]']: isDangerVisible,
					['w-24']: uiDensity === UI_DENSITY.COMPACT,
					['w-32']: uiDensity === UI_DENSITY.COMFORTABLE
				})}
				entry={entry}
				exit={exit}
				lazy={true}
				ref={ref}
				style={listAfterAffordanceStyle}
				testID={testID ?? `listAfterAffordance--${id}`}
				visible={visible}
			>
				<ListAffordanceButton
					{...(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER && {icon: checkIconElement})}
					backgroundVisible={!isDangerVisible}
					disabled={primaryButtonDisabled}
					labelText={primaryButtonLabelText}
					loading={primaryButtonLoading}
					onPressOut={onConfirm}
					size={size}
					style={primaryButtonStyle}
					tabIndex={buttonTabIndex}
					testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
				/>

				<ListAffordanceButton
					{...(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER && {icon: closeIconElement})}
					backgroundVisible={false}
					disabled={secondaryButtonDisabled}
					labelText={secondaryButtonLabelText}
					loading={secondaryButtonLoading}
					onPressOut={onSecondaryAction}
					size={size}
					style={secondaryButtonStyle}
					tabIndex={buttonTabIndex}
					testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
				/>

				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.FADE}
					className='pointer-events-none absolute bottom-0 right-0 top-0 -z-10 w-1/2 bg-[--color-error]'
					entry={entry}
					exit={exit}
					lazy={true}
					style={dangerAnimatedStyle}
					testID={`listAfterAffordance__animatedDanger--${id}`}
					visible={isDangerVisible}
				/>
			</LayoutAnimated>
		)
	}
)

RenderListAfterAffordance.displayName = 'RenderListAfterAffordance'
