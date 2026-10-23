import {forwardRef} from 'react'
import {View} from 'react-native'

import type {RenderPopoverProps} from './Popover.interface'

import {useTheme} from '../../hooks'
import {POPOVER_TYPE} from './Popover.enum'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
	({children, className, id, onContextMenu, testID, type, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes

		return (
			<View
				{...containerProps}
				{...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu})}
				className={classesName('relative flex flex-col', className)}
				ref={ref}
				testID={testID ?? `popover--${id}`}
			>
				{children}
			</View>
		)
	}
)
