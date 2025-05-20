import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {LIST_SELECT_TYPE} from '../List.enum'
import {ListItem} from './List-item.component'

describe('ListItem', () => {
	it('should renders headline and supporting text', async () => {
		const {getByText} = await renderWithAct(
			<ListItem
				headline='Headline'
				indexKey='item-1'
				supporting='Supporting'
			/>
		)

		const {headline, supporting} = await waitFor(() => ({
			headline: getByText('Headline'),
			supporting: getByText('Supporting')
		}))

		expect(headline).toBeTruthy()
		expect(supporting).toBeTruthy()
	})

	it('should renders trailing icon when trailing prop is provided', async () => {
		const {getByTestId} = await renderWithAct(
			<ListItem
				headline='With Trailing'
				indexKey='item-2'
				trailing={<Text testID='customTrailing'>⋯</Text>}
			/>
		)

		const trailing = await waitFor(() => getByTestId('listItem__trailing--test-id'))

		expect(trailing).toBeTruthy()
	})

	it('should triggers onActive callback when pressed', async () => {
		const onActive = jest.fn()
		const {getByTestId} = await renderWithAct(
			<ListItem
				headline='Press Me'
				indexKey='item-3'
				onActive={onActive}
				selectType={LIST_SELECT_TYPE.SINGLE}
			/>
		)

		const touchable = await waitFor(() => getByTestId('listItem__touchable--test-id'))

		await act(async () => fireEvent(touchable, 'pressOut', {}))
		await waitFor(() => expect(onActive).toHaveBeenCalledWith('item-3'))
	})

	it('should renders divider correctly', async () => {
		const {getByTestId} = await renderWithAct(
			<ListItem
				afterAffordance
				afterAffordanceActiveKey='item-5'
				divider
				headline='With Divider'
				indexKey='item-5'
			/>
		)

		const divider = await waitFor(() => expect(getByTestId('listItem__divider--test-id')))

		expect(divider).toBeTruthy()
	})

	it('should applies animated headline and content styles', async () => {
		const {getByTestId} = await renderWithAct(
			<ListItem
				activeKey='item-6'
				headline='Animated'
				indexKey='item-6'
				selectType={LIST_SELECT_TYPE.SINGLE}
			/>
		)

		const headlineText = await waitFor(() => getByTestId('listItem__animatedHeadlineText--test-id'))

		expect(headlineText).toBeTruthy()
	})
})
