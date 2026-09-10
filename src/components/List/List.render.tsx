import {LAYOUT} from '@/constants'
import {classesName} from '@/utils'
import {forwardRef, type FC} from 'react'
import {View, type ScrollView} from 'react-native'
import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'
import type {RenderListItemOptions, RenderListProps} from './List.interface'

export const RenderDefaultListItem: FC<RenderListItemOptions> = ({id, item, supportingTextNumberOfLines, ...props}) => (
	<ListItem
		{...(typeof item?.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
		{...item}
		{...props}
		indexKey={item?.indexKey ?? `${item.index}`}
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
	) => (
		<View
			accessibilityLabel='list'
			accessibilityRole='list'
			accessible={true}
			className={classesName('flex-1 self-stretch', {
				['pb-2 pt-2']: layoutType === LAYOUT.VERTICAL,
				['pl-2 pr-2']: layoutType === LAYOUT.HORIZONTAL
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
)

RenderList.displayName = 'RenderList'
