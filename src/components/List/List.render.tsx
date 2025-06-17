import {forwardRef, type FC} from 'react'
import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'
import type {ListData, RenderListItemOptions, RenderListProps, VirtualListComponent} from './List.interface'
import {Container} from './List.styles'

export const RenderDefaultListItem: FC<RenderListItemOptions> = ({
	id,
	index,
	item,
	supportingTextNumberOfLines,
	...props
}) => (
	<ListItem
		{...(typeof item?.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
		{...item}
		{...props}
		indexKey={item?.indexKey ?? `${index}`}
		itemIndex={index}
		testID={`list__listItem--${id}`}
	/>
)

export const RenderList = forwardRef<VirtualListComponent<ListData>, RenderListProps>(
	(
		{
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
		},
		ref
	) => (
		<Container
			accessibilityLabel='list'
			accessibilityRole='list'
			accessible={true}
			style={[style]}
			testID={testID ?? `list--${id}`}
		>
			<VirtualList
				{...virtualListProps}
				ref={ref}
				testID={`list__virtualList--${id}`}
				extraData={[
					...extraData,
					`${activeKey}`,
					`${activeKeys?.join()} `,
					`${afterAffordanceActiveKey}`,
					`${focusedIndex}`,
					`${loading}`
				]}
				focusedIndex={focusedIndex}
				loading={loading}
			/>
		</Container>
	)
)
