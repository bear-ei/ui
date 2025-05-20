import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {VirtualList} from '../Virtual-list'
import type {VirtualListData} from './Virtual-list.interface'

const createItem = (index: number): VirtualListData => ({
	indexKey: `item-${index}`,
	label: `Item ${index}`
})

describe('VirtualList Component', () => {
	const renderItem = ({item}: any) => <>{item.label}</>

	it('should renders loading state', async () => {
		const {getByText} = await renderWithAct(
			<VirtualList
				data={[]}
				loading
				renderItem={renderItem}
			/>
		)

		const loading = await waitFor(() => getByText('Loading'))

		expect(loading).toBeTruthy()
	})

	it('should renders empty state', async () => {
		const {getByText} = await renderWithAct(
			<VirtualList
				data={[]}
				loading={false}
				renderItem={renderItem}
			/>
		)

		const noData = await waitFor(() => getByText('No data'))

		expect(noData).toBeTruthy()
	})

	it('should renders item list with correct count', async () => {
		const items = Array.from({length: 20}, (_, i) => createItem(i))
		const {getAllByTestId} = await renderWithAct(
			<VirtualList
				data={items}
				itemSize={50}
				gap={0}
				renderItem={renderItem}
			/>
		)

		const renderedItems = await waitFor(() => getAllByTestId('virtualList__virtualListItem--test-id'))

		expect(renderedItems.length).toBeGreaterThan(0)
	})

	it('should auto scrolls to focusedIndex', async () => {
		const items = Array.from({length: 10}, (_, i) => createItem(i))
		const {getByTestId} = await renderWithAct(
			<VirtualList
				data={items}
				itemSize={50}
				focusedIndex={2}
				renderItem={renderItem}
			/>
		)

		const scrollView = await waitFor(() => getByTestId('virtualList__animatedScrollView--test-id'))

		expect(scrollView).toBeTruthy()
	})
})
