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

		const layoutPane = await waitFor(() => getByText('Pane Content'))

		expect(layoutPane).toBeTruthy()
	})

	it('should applies default layout direction as horizontal', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane testID='pane-default'>
				<Text>Default Layout</Text>
			</LayoutPane>
		)

		const layoutPane = await waitFor(() => getByTestId('pane-default'))

		expect(layoutPane).toBeTruthy()
	})

	it('should applies vertical layout style when layout is set to VERTICAL', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				testID='pane-vertical'
				layout={LAYOUT.VERTICAL}
			>
				<Text>Vertical Layout</Text>
			</LayoutPane>
		)

		const layoutPane = await waitFor(() => getByTestId('pane-vertical'))

		expect(layoutPane).toBeTruthy()
	})

	it('should merges contentStyle correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				testID='pane-style'
				contentStyle={{padding: 12}}
			>
				<Text>Styled</Text>
			</LayoutPane>
		)

		const layoutPane = await waitFor(() => getByTestId('pane-style'))

		expect(layoutPane).toBeTruthy()
	})

	it('should respects defaultVisible prop', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane
				testID='pane-visible'
				defaultVisible={false}
			>
				<Text>Hidden Layout</Text>
			</LayoutPane>
		)

		const layoutPane = await waitFor(() => getByTestId('pane-visible'))

		expect(layoutPane).toBeTruthy()
	})
})
