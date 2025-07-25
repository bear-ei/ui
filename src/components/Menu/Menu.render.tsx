import {SHAPE} from '@bearei/element-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {Tooltip, TOOLTIP_TYPE} from '../Tooltip'
import {MenuList} from './Menu-list'
import type {RenderMenuProps} from './Menu.interface'
import {Container} from './Menu.styles'

export const RenderMenu = forwardRef<View, RenderMenuProps>(
	(
		{
			activeKey,
			activeKeys,
			data,
			focusedIndex,
			id,
			multiple,
			onActive,
			onActives,
			onKeyDown,
			onVisible,
			shape = SHAPE.SMALL,
			testID,
			type,
			visible,
			...tooltipProps
		},
		ref
	) => {
		const supporting = (
			<MenuList
				activeKey={activeKey}
				activeKeys={activeKeys}
				data={data}
				focusedIndex={focusedIndex}
				multiple={multiple}
				onActive={onActive}
				onActives={onActives}
				onKeyDown={onKeyDown}
				ref={ref}
				shape={shape}
				testID={`menu__list--${id}`}
				type={type}
			/>
		)

		return (
			<Container testID={testID ?? `menu--${id}`}>
				<Tooltip
					{...tooltipProps}
					elevation={2}
					onVisible={onVisible}
					shape={shape}
					supporting={supporting}
					type={TOOLTIP_TYPE.MENU}
					visible={visible}
				/>
			</Container>
		)
	}
)
