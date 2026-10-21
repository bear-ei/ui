import {forwardRef} from 'react'
import {View} from 'react-native'

import {useTheme} from '../../hooks'

import {POPOVER_TYPE} from './Popover.enum'
import type {RenderPopoverProps} from './Popover.interface'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
	({children, className, id, testID, type, onContextMenu, ...containerProps}, ref) => {
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

RenderPopover.displayName = 'RenderPopover'
