import {forwardRef} from 'react'
import {TextInput} from 'react-native'

import {TRIGGER_ON} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_TYPE, RADIUS, SHAPE} from '../../theme'
import {Menu} from '../Menu'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from '../Popover'

import {SearchTextInput} from './Search-text-input'
import type {RenderSearchProps} from './Search.interface'

export const RenderSearch = forwardRef<TextInput, RenderSearchProps>(
	(
		{
			activeKey,
			closeTrailing,
			data,
			emptyElement,
			id,
			listVisible,
			onActive,
			onAnimationFinished,
			onFocus,
			onFocusKey,
			onMenuClose,
			onVisible,
			size,
			textInputPicker: isTextInputPicker,
			...textInputProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName, densityClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
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
						className={classesName('justify-center self-stretch', `${densityControlClasses(size)} w-auto`)}
						closeTrailing={closeTrailing}
						data={data}
						emptyElement={emptyElement}
						onActive={onActive}
						onAnimationFinished={onAnimationFinished}
						onClose={onMenuClose}
						onFocus={onFocus}
						onFocusKey={onFocusKey}
						onVisible={onVisible}
						popoverContentPosition={POPOVER_CONTENT_POSITION.VERTICAL_END}
						radius={listVisible ? RADIUS.MEDIUM : RADIUS.X_LARGE}
						shape={SHAPE.ALL}
						size={size}
						testID={`search__picker--${id}`}
						trailingTriggerOn={TRIGGER_ON.HOVER}
						triggerEvent={TRIGGER_ON.NONE}
						type={POPOVER_TYPE.TEXT_INPUT_PICKER}
						visible={listVisible}
					>
						{searchTextInputElement}
					</Menu>
				:	searchTextInputElement}
			</>
		)
	}
)

RenderSearch.displayName = 'RenderSearch'
