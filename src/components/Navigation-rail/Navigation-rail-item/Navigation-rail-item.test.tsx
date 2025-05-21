import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../../__test__'
import {NavigationRailItem} from './Navigation-rail-item.component'

describe('NavigationRailItem Component', () => {
	it('should renders correctly with label and icon', async () => {
		const {getByTestId, getByText} = await renderWithAct(
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
		const {getByTestId} = await renderWithAct(
			<NavigationRailItem
				activeKey='other'
				indexKey='home'
				labelText='Home'
				onActive={onActive}
			/>
		)

		const touchable = await waitFor(() => getByTestId('navigationRailItem__touchableContent--test-id'))

		await act(async () => fireEvent(touchable, 'onPressOut'))
		await waitFor(() => expect(onActive).toHaveBeenCalledWith('home'))
	})

	it('should does not call onActive when already active', async () => {
		const onActive = jest.fn()
		const {getByTestId} = await renderWithAct(
			<NavigationRailItem
				activeKey='home'
				indexKey='home'
				labelText='Home'
				onActive={onActive}
			/>
		)

		const touchable = await waitFor(() => getByTestId('navigationRailItem__touchableContent--test-id'))

		await act(async () => fireEvent(touchable, 'onPressOut'))
		await waitFor(() => expect(onActive).toHaveBeenCalled())
	})
})
