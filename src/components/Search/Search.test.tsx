import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Search} from './Search.component'

describe('Search Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = renderWithTheme(<Search placeholder='Search here' />)
		const {search, labelText} = await waitFor(() => ({
			labelText: getByTestId('search__searchTextInput--test-id'),
			search: getByTestId('search--test-id')
		}))

		expect(labelText).toBeTruthy()
		expect(search).toBeTruthy()
	})

	it('should renders custom leading and trailing icons', async () => {
		const {getByTestId} = renderWithTheme(
			<Search
				leading={<Text testID='search__leading--text'>{'leading'}</Text>}
				trailing={<Text testID='search__trailing--text'>{'trailing'}</Text>}
			/>
		)

		const {leading, trailing} = await waitFor(() => ({
			leading: getByTestId('search__leading--text'),
			trailing: getByTestId('search__trailing--text')
		}))

		expect(leading).toHaveTextContent('leading')
		expect(trailing).toHaveTextContent('trailing')
	})

	it('should calls onChangeText when typing', async () => {
		const mockOnChangeText = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Search
				placeholder='Search'
				listProps={{data: [{indexKey: '1', headline: 'apple'}]}}
				onChangeText={mockOnChangeText}
			/>
		)

		const textInput = await waitFor(() => getByTestId('search__searchTextInput--test-id'))

		fireEvent.changeText(textInput, 'apple')

		await waitFor(() => expect(mockOnChangeText).toHaveBeenCalledWith('apple'))
	})

	it('should does not show list if no data', async () => {
		const {queryByTestId} = renderWithTheme(<Search listProps={{data: []}} />)
		const searchList = await waitFor(() => queryByTestId('search__searchList--test-id'))

		expect(searchList).toBeNull()
	})
})
