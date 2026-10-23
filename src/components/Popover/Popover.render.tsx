import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderPopoverProps} from './Popover.interface'

import {useTheme} from '../../hooks'
import {POPOVER_TYPE} from './Popover.enum'

export const RenderPopover: FC<RenderPopoverProps> = ({
	children,
	className,
	id,
	onContextMenu,
	testID,
	type,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes

	return (
		<View
			{...containerProps}
			{...(type === POPOVER_TYPE.CONTEXT_MENU && {onContextMenu})}
			className={classesName('relative flex flex-col', className)}
			testID={testID ?? `popover--${id}`}
		>
			{children}
		</View>
	)
}
