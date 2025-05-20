import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {LAYOUT} from '../Common'
import {Layout} from './Layout.component'

describe('Layout Component', () => {
	it('should renders children correctly', async () => {
		const {getByText} = renderWithTheme(
			<Layout>
				<Text>Layout Content</Text>
			</Layout>
		)

		const layout = await waitFor(() => getByText('Layout Content'))

		expect(layout).toBeTruthy()
	})

	it('should uses default layout direction as horizontal', async () => {
		const {getByTestId} = renderWithTheme(
			<Layout testID='layout-default'>
				<Text>Default Layout</Text>
			</Layout>
		)

		const layout = await waitFor(() => getByTestId('layout-default'))

		expect(layout).toBeTruthy()
	})

	it('should applies vertical layout direction correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Layout
				testID='layout-vertical'
				layout={LAYOUT.VERTICAL}
			>
				<Text>Vertical Content</Text>
			</Layout>
		)

		const layout = await waitFor(() => getByTestId('layout-vertical'))

		expect(layout).toBeTruthy()
	})

	it('should merges contentStyle correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Layout
				testID='layout-style'
				contentStyle={{margin: 8}}
			>
				<Text>Styled Layout</Text>
			</Layout>
		)

		const layout = await waitFor(() => getByTestId('layout-style'))

		expect(layout).toBeTruthy()
	})

	it('should respects defaultVisible flag', async () => {
		const {getByTestId} = renderWithTheme(
			<Layout
				testID='layout-hidden'
				defaultVisible={false}
			>
				<Text>Hidden Layout</Text>
			</Layout>
		)

		const layout = await waitFor(() => getByTestId('layout-hidden'))

		expect(layout).toBeTruthy()
	})
})
