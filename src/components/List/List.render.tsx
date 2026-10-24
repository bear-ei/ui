import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderDefaultListItemProps, RenderListProps} from './List.interface'

import {ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../theme'
import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'

export const RenderDefaultListItem: FC<RenderDefaultListItemProps> = ({
	id,
	item,
	supportingTextNumberOfLines,
	...props
}) => (
	<ListItem
		{...(typeof item.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
		{...item}
		{...props}
		itemIndex={item.index}
		itemKey={item.itemKey}
		testID={`list__listItem--${id}`}
	/>
)

export const RenderList: FC<RenderListProps> = ({
	activeKey,
	activeKeys,
	afterAffordanceActiveKey,
	dependencies = [],
	focusedIndex,
	id,
	loading,
	orientation,
	style,
	testID,
	...virtualListProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.VERTICAL)

	return (
		<View
			accessibilityLabel='list'
			accessibilityRole='list'
			accessible={true}
			className={classNames('flex-1 self-stretch', {
				[densityHorizontalInsetClasses(DENSITY_SIZE.X_SMALL)]: orientation === ORIENTATION.HORIZONTAL,
				[densityVerticalInsetClasses(DENSITY_SIZE.X_SMALL)]: orientation === ORIENTATION.VERTICAL
			})}
			style={style}
			testID={testID ?? `list--${id}`}
		>
			<VirtualList
				{...virtualListProps}
				activeKey={activeKey}
				dependencies={[
					...dependencies,
					activeKey,
					activeKeys?.join(),
					afterAffordanceActiveKey,
					focusedIndex,
					loading
				]}
				focusedIndex={focusedIndex}
				loading={loading}
				orientation={orientation}
				testID={`list__virtualList--${id}`}
			/>
		</View>
	)
}
