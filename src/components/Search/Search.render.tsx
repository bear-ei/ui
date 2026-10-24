import {type FC} from 'react'

import type {RenderSearchProps} from './Search.interface'

import {TRIGGER_ON} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_TYPE, RADIUS, SHAPE} from '../../theme'
import {Menu} from '../Menu'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from '../Popover'
import {SearchTextInput} from './Search-text-input'

export const RenderSearch: FC<RenderSearchProps> = ({
	activeKey,
	data,
	emptyElement,
	enableTrailingClose,
	id,
	isTextInputPicker,
	listVisible,
	onActiveKeyChange,
	onAnimationFinished,
	onFocus,
	onFocusKeyChange,
	onMenuClose,
	onVisibleChange,
	ref,
	size,
	...textInputProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const searchTextInputElement = (
		<SearchTextInput
			{...textInputProps}
			{...(!isTextInputPicker && {onFocus})}
			id={id}
			ref={ref}
			size={size}
		/>
	)

	return (
		<>
			{isTextInputPicker ?
				<Menu
					activeKey={activeKey}
					className={classNames('justify-center self-stretch', `${densityControlClasses(size)} w-auto`)}
					contentPosition={POPOVER_CONTENT_POSITION.VERTICAL_END}
					data={data}
					emptyElement={emptyElement}
					enableTrailingClose={enableTrailingClose}
					onActiveKeyChange={onActiveKeyChange}
					onAnimationFinished={onAnimationFinished}
					onClose={onMenuClose}
					onFocus={onFocus}
					onFocusKeyChange={onFocusKeyChange}
					onVisibleChange={onVisibleChange}
					radius={listVisible ? RADIUS.MEDIUM : RADIUS.X_LARGE}
					shape={SHAPE.ALL}
					size={size}
					testID={`search__picker--${id}`}
					trailingTriggerOn={TRIGGER_ON.HOVER}
					triggerOn={TRIGGER_ON.NONE}
					type={POPOVER_TYPE.TEXT_INPUT_PICKER}
					visible={listVisible}
				>
					{searchTextInputElement}
				</Menu>
			:	searchTextInputElement}
		</>
	)
}
