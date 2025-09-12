import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {InteractionHandlers} from '../../../hooks'
import {List, LIST_SELECT_TYPE, LIST_TYPE} from '../../List'
import type {RenderMenuListProps} from './Menu-list.interface'
import {Container} from './Menu-list.styles'

export const RenderMenuList = forwardRef<View, RenderMenuListProps>(
	(
		{
			data,
			id,
			listType = LIST_TYPE.MENU,
			multiple,
			onFocus,
			onKeyDown,
			shape,
			testID,
			theme,
			type,
			...menuProps
		},
		ref
	) => {
		const dataNumber = data?.length ?? 0
		const itemSize = theme.adaptSize(
			theme.token.spacing.extraSmall * (listType === LIST_TYPE.LABEL ? 10 : 12)
		)

		return (
			<Container
				height={dataNumber * itemSize + theme.adaptSize(theme.token.spacing.medium)}
				onKeyDown={onKeyDown}
				ref={ref}
				tabIndex={-1}
				testID={testID ?? `menu--${id}`}
				type={type}
				shape={shape}
			>
				<List
					{...menuProps}
					data={data}
					itemSize={itemSize}
					onItemStateEvent={{onFocus} as InteractionHandlers}
					selectType={multiple ? LIST_SELECT_TYPE.MULTIPLE : LIST_SELECT_TYPE.SINGLE}
					showsVerticalScrollIndicator={false}
					testID={`menu__list--${id}`}
					type={listType}
				/>
			</Container>
		)
	}
)
