import {Check, X} from 'lucide-react-native'
import {type FC} from 'react'

import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'

import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, ENTRY_EXIT, UI_DENSITY} from '../../../theme'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../../Layout-animated'
import {ListAffordanceButton} from '../List-affordance-button'
import {LIST_AFTER_AFFORDANCE_PHASE} from './List-after-affordance.enum'

export const RenderListAfterAffordance: FC<RenderListAfterAffordanceProps> = ({
	dangerAnimatedStyle,
	id,
	interactionHandlers,
	onPrimaryAction,
	onSecondaryPress,
	phase,
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
}) => {
	const {token, uiDensity} = useTheme()
	const {classNames} = token.classes
	const buttonTabIndex = visible ? 0 : -1
	const checkIconElement = <Check testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`} />
	const closeIconElement = <X testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`} />

	// Secondary button carries the destructive action (delete).
	// When it's disabled, fall back to the disabled style and hide the danger block.
	const isDangerVisible = !secondaryButtonDisabled
	const {entry, exit} = ENTRY_EXIT.SHORT

	return (
		<LayoutAnimated
			{...containerProps}
			{...interactionHandlers}
			animation={LAYOUT_ANIMATION.FADE}
			className={classNames('relative flex flex-row self-stretch', {
				['bg-[--color-primary]']: isDangerVisible,
				['w-24']: uiDensity === UI_DENSITY.COMPACT,
				['w-32']: uiDensity === UI_DENSITY.COMFORTABLE
			})}
			entry={entry}
			exit={exit}
			lazyMount={true}
			testID={testID ?? `listAfterAffordance--${id}`}
			visible={visible}
		>
			<ListAffordanceButton
				{...(phase === LIST_AFTER_AFFORDANCE_PHASE.DANGER && {icon: checkIconElement})}
				backgroundVisible={!isDangerVisible}
				disabled={primaryButtonDisabled}
				labelText={primaryButtonLabelText}
				loading={primaryButtonLoading}
				onPressOut={onPrimaryAction}
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
				onPressOut={onSecondaryPress}
				size={size}
				style={secondaryButtonStyle}
				tabIndex={buttonTabIndex}
				testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
			/>

			<LayoutAnimated
				animation={LAYOUT_ANIMATION.FADE}
				className='pointer-events-none absolute bottom-0 right-0 top-0 -z-10 w-1/2 bg-[--color-error]'
				entry={entry}
				exit={exit}
				lazyMount={true}
				style={dangerAnimatedStyle}
				testID={`listAfterAffordance__animatedDanger--${id}`}
				visible={isDangerVisible}
			/>
		</LayoutAnimated>
	)
}
