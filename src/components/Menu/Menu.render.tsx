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
	data,
	elevation,
	emptyElement,
	enableTrailingClose,
	focusedIndex,
	id,
	listType,
	multiple,
	onActiveKeyChange,
	onActiveKeysChange,
	onClose,
	onKeyDown,
	onVisibleChange,
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
			data={data}
			emptyElement={emptyElement}
			enableTrailingClose={enableTrailingClose}
			focusedIndex={focusedIndex}
			listType={listType}
			multiple={multiple}
			onActiveKeyChange={onActiveKeyChange}
			onActiveKeysChange={onActiveKeysChange}
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
				onVisibleChange={onVisibleChange}
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
