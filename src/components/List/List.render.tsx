import {forwardRef, type FC} from 'react'
import type {ScrollView} from 'react-native'
import {VirtualList} from '../Virtual-list'
import {ListItem} from './List-item'
import type {RenderListItemOptions, RenderListProps} from './List.interface'
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

export const RenderList = forwardRef<ScrollView, RenderListProps>(
	(
		{
			activeKey,
			activeKeys,
			afterAffordanceActiveKey,
			extraData = [],
			focusedIndex,
			id,
			layout,
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
			layout={layout}
			style={[style]}
			testID={testID ?? `list--${id}`}
		>
			<VirtualList
				{...virtualListProps}
				activeKey={activeKey}
				layout={layout}
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
