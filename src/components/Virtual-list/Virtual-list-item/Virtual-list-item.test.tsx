import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../../__test__'
import {VirtualListItem} from '../Virtual-list-item'

describe('VirtualListItem Component', () => {
	const mockItem = {indexKey: 'test-1', extraData: ['a']} as any
	const mockRenderItem = jest.fn(({item}) => <>{item.indexKey}</>)
	const mockOnUnmount = jest.fn()
	const mockOnLoadEnd = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		mockRenderItem.mockClear()
		mockOnUnmount.mockClear()
		mockOnLoadEnd.mockClear()
	})

	it('should render correctly after status changes to SUCCEEDED', async () => {
		const {getByTestId} = await renderWithAct(
			<VirtualListItem
				item={mockItem}
				index={1}
				startIndex={2}
				itemSize={100}
				renderItem={mockRenderItem}
				onLoadEnd={mockOnLoadEnd}
			/>
		)

		const item = await waitFor(() => getByTestId('virtualListItem--test-id'))

		expect(item).toBeTruthy()
		expect(mockRenderItem).toHaveBeenCalledWith(
			expect.objectContaining({
				index: 3,
				item: expect.objectContaining({
					indexKey: 'test-1',
					onClose: expect.any(Function),
					onLoadEnd: mockOnLoadEnd
				})
			})
		)
	})
})
