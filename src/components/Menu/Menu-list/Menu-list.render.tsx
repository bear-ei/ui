import {type FC} from 'react'
import {Platform, View, type ViewStyle} from 'react-native'

import type {RenderMenuListProps} from './Menu-list.interface'

import {useTheme} from '../../../hooks'
import {DENSITY_SIZE} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
import {List, LIST_SELECTION_TYPE, LIST_TYPE} from '../../List'
import {POPOVER_TYPE} from '../../Popover'

const PLATFORMS = ['web', 'windows', 'macos']
export const RenderMenuList: FC<RenderMenuListProps> = ({
	data,
	id,
	listType = LIST_TYPE.MENU,
	multiple,
	onKeyDown,
	ref,
	size = DENSITY_SIZE.SMALL,
	testID,
	type,
	...menuProps
}) => {
	const {token} = useTheme()
	const {classNames} = token.classes
	const dataNumber = data?.length ?? 0
	const itemSize = token.density.control[size]
	const height = dataNumber * itemSize + token.density.spacing[DENSITY_SIZE.X_SMALL] * 2
	const menuListStyle = {height: toPlatformUnit(height)} as ViewStyle

	return (
		<View
			{...(PLATFORMS.includes(Platform.OS) && {onKeyDown})}
			className={classNames('overflow-hidden bg-[--color-surface-container] outline-none', {
				['min-h-80']: type === POPOVER_TYPE.TEXT_INPUT_PICKER,
				['min-w-[11.25rem]']: type === POPOVER_TYPE.CONTEXT_MENU
			})}
			ref={ref}
			style={menuListStyle}
			tabIndex={-1}
			testID={testID ?? `menuList--${id}`}
		>
			<List
				{...menuProps}
				data={data}
				itemSize={itemSize}
				selectionType={multiple ? LIST_SELECTION_TYPE.MULTIPLE : LIST_SELECTION_TYPE.SINGLE}
				showsVerticalScrollIndicator={false}
				size={size}
				testID={`menuList__list--${id}`}
				type={listType}
			/>
		</View>
	)
}
