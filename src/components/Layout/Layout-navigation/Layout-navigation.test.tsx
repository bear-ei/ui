import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {LayoutNavigation} from './Layout-navigation.component'

describe('LayoutNavigation Component', () => {
	it('should renders children content correctly', async () => {
		const {getByText} = renderWithTheme(
			<LayoutNavigation>
				<Text>Navigation Item</Text>
			</LayoutNavigation>
		)

		const navigation = await waitFor(() => getByText('Navigation Item'))

		expect(navigation).toBeTruthy()
	})

	it('should applies default animatedType and visibility', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutNavigation>
				<Text>Visible</Text>
			</LayoutNavigation>
		)

		const navigation = await waitFor(() => getByTestId('layoutNavigation--test-id'))

		expect(navigation).toBeTruthy()
	})

	it('should accepts custom testID', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutNavigation testID='customNavTest'>
				<Text>Custom</Text>
			</LayoutNavigation>
		)

		const navigation = await waitFor(() => getByTestId('customNavTest'))

		expect(navigation).toBeTruthy()
	})

	it(' should renders with specified animatedType', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutNavigation
				animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
				testID='animatedNav'
			>
				<Text>Expanded</Text>
			</LayoutNavigation>
		)

		const navigation = await waitFor(() => getByTestId('animatedNav'))

		expect(navigation).toBeTruthy()
	})
})
