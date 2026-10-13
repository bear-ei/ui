import {forwardRef} from 'react'
import {Platform, View, type ViewStyle} from 'react-native'
import {List, LIST_SELECT_TYPE, LIST_TYPE} from '../../List'
import {POPOVER_TYPE} from '../../Popover'
import type {RenderMenuListProps} from './Menu-list.interface'
import {DENSITY_SIZE, platformValue} from '../../../theme'
import {useTheme} from '../../../hooks'

export const RenderMenuList = forwardRef<View, RenderMenuListProps>(
	(
		{
			data,
			id,
			listType = LIST_TYPE.MENU,
			multiple,
			onKeyDown,
			size = DENSITY_SIZE.SMALL,
			testID,
			type,
			...menuProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const dataNumber = data?.length ?? 0
		const itemSize = token.density.control[size]
		const height = dataNumber * itemSize + token.density.spacing[DENSITY_SIZE.X_SMALL] * 2
		const menuListStyle = {height: platformValue(height)} as ViewStyle

		return (
			<View
				{...(['web', 'windows', 'macos'].includes(Platform.OS) && {onKeyDown})}
				className={classesName('overflow-hidden bg-[--color-surface-container] outline-none', {
					['min-h-80']: type === POPOVER_TYPE.TEXT_INPUT_PICKER,
					['min-w-[11.25rem]']: type === POPOVER_TYPE.CONTEXT_MENU
				})}
				ref={ref}
				style={[menuListStyle]}
				tabIndex={-1}
				testID={testID ?? `menuList--${id}`}
			>
				<List
					{...menuProps}
					data={data}
					itemSize={itemSize}
					selectType={multiple ? LIST_SELECT_TYPE.MULTIPLE : LIST_SELECT_TYPE.SINGLE}
					showsVerticalScrollIndicator={false}
					size={size}
					testID={`menuList__list--${id}`}
					type={listType}
				/>
			</View>
		)
	}
)

RenderMenuList.displayName = 'RenderMenuList'
