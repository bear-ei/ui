import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'
import type {RenderListItemOptions, RenderListProps} from './List.interface'
import {Container} from './List.styles'

export const renderDefaultListItem = ({
	index,
	item,
	supportingTextNumberOfLines,
	id,
	...props
}: RenderListItemOptions) => (
	<ListItem
		{...(typeof item?.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
		{...item}
		{...props}
		indexKey={item?.indexKey ?? `${index}`}
		itemIndex={index}
		testID={`list__listItem--${id}`}
	/>
)

export const renderList = ({
	activeKey,
	activeKeys,
	afterAffordanceActiveKey,
	extraData = [],
	focusedIndex,
	id,
	loading,
	style,
	testID,
	...virtualListProps
}: RenderListProps) => (
	<Container
		accessibilityLabel='list'
		accessibilityRole='list'
		accessible={true}
		style={[style]}
		testID={testID ?? `list--${id}`}
	>
		<VirtualList
			{...virtualListProps}
			testID={`list__virtualList--${id}`}
			extraData={[
				`${activeKey}`,
				`${activeKeys?.join()} `,
				`${afterAffordanceActiveKey}`,
				`${focusedIndex}`,
				`${loading}`,
				...extraData
			]}
			focusedIndex={focusedIndex}
			loading={loading}
		/>
	</Container>
)
