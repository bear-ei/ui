import {forwardRef} from 'react'
import {VirtualList} from '../Virtual-list'
import {ListBase} from './List-base.component'
import type {ListData, ListProps, RenderListProps, VirtualListComponent} from './List.interface'
import {Container} from './List.styles'

const renderList = ({
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

const ListWithRef = forwardRef<VirtualListComponent<ListData>, ListProps>((props, ref) => (
	<ListBase
		{...props}
		ref={ref}
		renderList={renderList}
	/>
))

export const List = ListWithRef
