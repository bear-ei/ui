import {forwardRef, type FC} from 'react'
import {View, type ScrollView} from 'react-native'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../theme'
import {VirtualList} from '../Virtual-list'

import {ListItem} from './List-item'
import type {RenderListItemOptions, RenderListProps} from './List.interface'

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

export const RenderList = forwardRef<ScrollView, RenderListProps>(
	(
		{
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
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName, densityClasses} = token.classes
		const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.HORIZONTAL)
		const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.VERTICAL)

		return (
			<View
				accessibilityLabel='list'
				accessibilityRole='list'
				accessible={true}
				className={classesName('flex-1 self-stretch', {
					[densityVerticalInsetClasses(DENSITY_SIZE.X_SMALL)]: layoutType === LAYOUT.VERTICAL,
					[densityHorizontalInsetClasses(DENSITY_SIZE.X_SMALL)]: layoutType === LAYOUT.HORIZONTAL
				})}
				style={[style]}
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
					ref={ref}
					testID={`list__virtualList--${id}`}
				/>
			</View>
		)
	}
)

RenderList.displayName = 'RenderList'
