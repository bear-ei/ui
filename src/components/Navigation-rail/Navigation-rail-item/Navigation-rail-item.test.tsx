import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../../__test__'
import {NavigationRailItem} from './Navigation-rail-item.component'

describe('NavigationRailItem', () => {
	it('should renders correctly with label and icon', async () => {
		const {getByTestId, getByText} = renderWithTheme(
			<NavigationRailItem
				activeKey='home'
				indexKey='home'
				labelText='Home'
				testID='rail-item'
			/>
		)

		const {item, icon, home} = await waitFor(() => ({
			home: getByText('Home'),
			icon: getByTestId('navigationRailItem__icon--test-id'),
			item: getByTestId('rail-item')
		}))

		expect(home).toBeTruthy()
		expect(icon).toBeTruthy()
		expect(item).toBeTruthy()
	})

	it('should calls onActive on press out when inactive', async () => {
		const onActive = jest.fn()
		const {getByTestId} = renderWithTheme(
			<NavigationRailItem
				activeKey='other'
				indexKey='home'
				onActive={onActive}
				labelText='Home'
			/>
		)

		const touchable = await waitFor(() => getByTestId('navigationRailItem__touchableContent--test-id'))

		fireEvent(touchable, 'onPressOut')
		await waitFor(() => expect(onActive).toHaveBeenCalledWith('home'))
	})

	it('should does not call onActive when already active', async () => {
		const onActive = jest.fn()
		const {getByTestId} = renderWithTheme(
			<NavigationRailItem
				activeKey='home'
				indexKey='home'
				onActive={onActive}
				labelText='Home'
			/>
		)

		const touchable = await waitFor(() => getByTestId('navigationRailItem__touchableContent--test-id'))

		fireEvent(touchable, 'onPressOut')
		await waitFor(() => expect(onActive).toHaveBeenCalled())
	})
})
