import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderListItemOptions, RenderListProps} from './List.interface'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../theme'
import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'

export const RenderDefaultListItem: FC<RenderListItemOptions> = ({id, item, supportingTextNumberOfLines, ...props}) => (
	<ListItem
		{...(typeof item.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
		{...item}
		{...props}
		indexKey={item.indexKey}
		itemIndex={item.index}
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
	layoutType,
	loading,
	style,
	testID,
	...virtualListProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses} = token.classes
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.HORIZONTAL)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.VERTICAL)

	return (
		<View
			accessibilityLabel='list'
			accessibilityRole='list'
			accessible={true}
			className={classesName('flex-1 self-stretch', {
				[densityHorizontalInsetClasses(DENSITY_SIZE.X_SMALL)]: layoutType === LAYOUT.HORIZONTAL,
				[densityVerticalInsetClasses(DENSITY_SIZE.X_SMALL)]: layoutType === LAYOUT.VERTICAL
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
				layoutType={layoutType}
				loading={loading}
				testID={`list__virtualList--${id}`}
			/>
		</View>
	)
}
