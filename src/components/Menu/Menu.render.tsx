import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderMenuProps} from './Menu.interface'

import {RADIUS, SHAPE} from '../../theme'
import {Popover, POPOVER_TYPE} from '../Popover'
import {MenuList} from './Menu-list'

export const RenderMenu: FC<RenderMenuProps> = ({
	activeKey,
	activeKeys,
	children,
	closeTrailing,
	data,
	elevation,
	emptyElement,
	focusedIndex,
	id,
	listType,
	multiple,
	onActive,
	onActives,
	onClose,
	onKeyDown,
	onVisible,
	radius = RADIUS.MEDIUM,
	ref,
	shape = SHAPE.ALL,
	size,
	testID,
	trailingTriggerOn,
	type,
	visible,
	...popoverProps
}) => {
	const popoverContentElement = (
		<MenuList
			{...(type === POPOVER_TYPE.CONTEXT_MENU && {onKeyDown})}
			activeKey={activeKey}
			activeKeys={activeKeys}
			closeTrailing={closeTrailing}
			data={data}
			emptyElement={emptyElement}
			focusedIndex={focusedIndex}
			listType={listType}
			multiple={multiple}
			onActive={onActive}
			onActives={onActives}
			onClose={onClose}
			ref={ref}
			size={size}
			testID={`menu__list--${id}`}
			trailingTriggerOn={trailingTriggerOn}
			type={type}
		/>
	)

	return (
		<View
			className='flex-1'
			testID={testID ?? `menu--${id}`}
		>
			<Popover
				{...popoverProps}
				content={popoverContentElement}
				elevation={elevation}
				onKeyDown={onKeyDown}
				onVisible={onVisible}
				radius={radius}
				shape={shape}
				type={type}
				visible={visible}
			>
				{children}
			</Popover>
		</View>
	)
}
