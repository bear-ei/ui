import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {NavigationRail} from './Navigation-rail.component'

describe('NavigationRail Component', () => {
	const mockData = [
		{indexKey: 'home', labelText: 'Home'},
		{indexKey: 'search', labelText: 'Search'}
	]

	it('should renders with items and activates defaultActiveKey', async () => {
		const {getByTestId, getAllByTestId, getByText} = await renderWithAct(
			<NavigationRail
				data={mockData}
				defaultActiveKey='search'
			/>
		)

		const {navigationRai, navigationRailItems, search} = await waitFor(() => ({
			navigationRai: getByTestId('navigationRail--test-id'),
			navigationRailItems: getAllByTestId('navigationRail__navigationRailItem--test-id'),
			search: getByText('Search')
		}))

		expect(navigationRai).toBeTruthy()
		expect(navigationRailItems).toHaveLength(2)
		expect(search).toBeTruthy()
	})

	it('should renders fab and menu elements when provided', async () => {
		const Fab = () => <></>
		const Menu = () => <></>
		const {getByTestId} = await renderWithAct(
			<NavigationRail
				data={mockData}
				fab={<Fab />}
				menu={<Menu />}
			/>
		)

		const {fab, menu} = await waitFor(() => ({
			fab: getByTestId('navigationRail__fab--test-id'),
			menu: getByTestId('navigationRail__menu--test-id')
		}))

		expect(fab).toBeTruthy()
		expect(menu).toBeTruthy()
	})
})
