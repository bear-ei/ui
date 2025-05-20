import {act, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {List} from './List.component'
import type {ListData} from './List.interface'

const mockData: ListData[] = [
	{indexKey: 'item-1', headline: 'Item 1'},
	{indexKey: 'item-2', headline: 'Item 2'},
	{indexKey: 'item-3', headline: 'Item 3'}
]

describe('List Component', () => {
	it('should renders the list with all items', async () => {
		const {getByText, getByTestId} = await renderWithAct(<List data={mockData} />)
		const virtualList = await waitFor(() => getByTestId('list__virtualList--test-id'))

		await act(async () =>
			virtualList.props.onLayout?.({
				nativeEvent: {
					layout: {x: 0, y: 0, width: 800, height: 800}
				}
			})
		)

		const {item1, item2, item3} = await waitFor(() => ({
			item1: getByText('Item 1'),
			item2: getByText('Item 2'),
			item3: getByText('Item 3')
		}))

		expect(item1).toBeTruthy()
		expect(item2).toBeTruthy()
		expect(item3).toBeTruthy()
	})

	it('should applies extraData correctly and rerenders items', async () => {
		const extraData = ['foo']
		const {getByTestId} = await renderWithAct(
			<List
				data={mockData}
				extraData={extraData}
			/>
		)

		const virtualList = await waitFor(() => getByTestId('list__virtualList--test-id'))

		expect(virtualList).toBeTruthy()
	})
})
