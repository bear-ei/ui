import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {LAYOUT} from '../Common'
import {Divider} from './Divider.component'

describe('Divider Component', () => {
	it('should renders with default props', async () => {
		const {getByTestId} = renderWithTheme(<Divider testID='divider' />)
		const {divider, dividerContent} = await waitFor(() => ({
			divider: getByTestId('divider'),
			dividerContent: getByTestId('divider__content--test-id')
		}))

		expect(divider).toBeTruthy()
		expect(dividerContent).toBeTruthy()
	})

	it('should renders horizontal layout with subheader', async () => {
		const {getByTestId, getByText} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.HORIZONTAL}
				subheader='Section A'
			/>
		)

		const {dividerSubheader, dividerSectionA} = await waitFor(() => ({
			dividerSubheader: getByTestId('divider__subheader--test-id'),
			dividerSectionA: getByText('Section A')
		}))

		expect(dividerSubheader).toBeTruthy()
		expect(dividerSectionA).toBeTruthy()
	})

	it('should renders vertical layout without subheader', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.VERTICAL}
			/>
		)

		const {divider, dividerContent, dividerSubheader} = await waitFor(() => ({
			divider: getByTestId('divider'),
			dividerContent: getByTestId('divider__content--test-id'),
			dividerSubheader: queryByTestId('divider__subheader--test-id')
		}))

		expect(divider).toBeTruthy()
		expect(dividerContent).toBeTruthy()
		expect(dividerSubheader).toBeNull()
	})

	it('should applies size SMALL when subheader is present and layout is horizontal', async () => {
		const {getByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.HORIZONTAL}
				subheader='Text'
			/>
		)

		const divider = await waitFor(() => getByTestId('divider'))

		expect(divider).toBeTruthy()
	})

	it('should supports custom size prop', async () => {
		const {getByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.VERTICAL}
				size='SMALL'
			/>
		)

		const divider = await waitFor(() => getByTestId('divider'))

		expect(divider).toBeTruthy()
	})
})
