import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {LAYOUT} from '../../Common'
import {LayoutPane} from './Layout-pane.component'

describe('LayoutPane Component', () => {
	it('should renders children correctly', async () => {
		const {getByText} = renderWithTheme(
			<LayoutPane>
				<Text>Pane Content</Text>
			</LayoutPane>
		)

		const pane = await waitFor(() => getByText('Pane Content'))

		expect(pane).toBeTruthy()
	})

	it('should applies default layout direction as horizontal', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane testID='pane-default'>
				<Text>Default Layout</Text>
			</LayoutPane>
		)

		const pane = await waitFor(() => getByTestId('pane-default'))

		expect(pane).toBeTruthy()
	})

	it('should applies vertical layout style when layout is set to VERTICAL', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				layout={LAYOUT.VERTICAL}
				testID='pane-vertical'
			>
				<Text>Vertical Layout</Text>
			</LayoutPane>
		)

		const pane = await waitFor(() => getByTestId('pane-vertical'))

		expect(pane).toBeTruthy()
	})

	it('should merges contentStyle correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				contentStyle={{padding: 12}}
				testID='pane-style'
			>
				<Text>Styled</Text>
			</LayoutPane>
		)

		const pane = await waitFor(() => getByTestId('pane-style'))

		expect(pane).toBeTruthy()
	})

	it('should respects defaultVisible prop', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				defaultVisible={false}
				testID='pane-visible'
			>
				<Text>Hidden Layout</Text>
			</LayoutPane>
		)

		const pane = await waitFor(() => getByTestId('pane-visible'))

		expect(pane).toBeTruthy()
	})
})
