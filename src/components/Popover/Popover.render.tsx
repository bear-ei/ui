import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderPopoverProps} from './Popover.interface'
import {useTheme} from '../../hooks'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
	({children, className, id, testID, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes

		return (
			<View
				{...containerProps}
				className={classesName('relative flex flex-col', className)}
				ref={ref}
				testID={testID ?? `popover--${id}`}
			>
				{children}
			</View>
		)
	}
)

RenderPopover.displayName = 'RenderPopover'
