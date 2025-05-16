import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Search} from '../Search'

describe('Search Component', () => {
	it('should render the base Search component', () => {
		const {getByTestId} = renderWithTheme(
			<Search
				placeholder='Search here...'
				testID='search'
			/>
		)

		expect(getByTestId('search')).toBeTruthy()
		expect(getByTestId('search__touchable--test-id')).toBeTruthy()
		expect(getByTestId('search__content--test-id')).toBeTruthy()
		expect(getByTestId('search__leading--test-id')).toBeTruthy()
		expect(getByTestId('search__main--test-id')).toBeTruthy()
		expect(getByTestId('search__textInputLayout--test-id')).toBeTruthy()
		expect(getByTestId('search__searchTextInput--test-id')).toBeTruthy()
		expect(getByTestId('search__underlay--test-id')).toBeTruthy()
	})

	it('should call onChangeText handler and show list when typing', async () => {
		const handleChangeText = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Search
				placeholder='Search here...'
				testID='search'
				onChangeText={handleChangeText}
			/>
		)

		const input = getByTestId('search__searchTextInput--test-id')

		fireEvent.changeText(input, 'new text')
		await waitFor(() => {
			expect(handleChangeText).toHaveBeenCalledWith('new text')
		})
	})

	it('should render leading icon by default and custom trailing icon if provided', () => {
		const trailing = <Text>{'T'}</Text>
		const {getByTestId, getByText} = renderWithTheme(
			<Search
				placeholder='Search here...'
				testID='search'
				trailing={trailing}
			/>
		)

		expect(getByTestId('search__iconSearch--test-id')).toBeTruthy()
		expect(getByTestId('search__trailing--test-id')).toBeTruthy()
		expect(getByText('T')).toBeTruthy()
	})
})
