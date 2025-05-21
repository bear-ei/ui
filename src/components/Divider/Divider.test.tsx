import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {LAYOUT} from '../Common'
import {Divider} from './Divider.component'

describe('Divider Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should renders with default props', async () => {
		const {getByTestId} = await renderWithAct(<Divider testID='divider' />)
		const {divider, content} = await waitFor(() => ({
			content: getByTestId('divider__content--test-id'),
			divider: getByTestId('divider')
		}))

		expect(content).toBeTruthy()
		expect(divider).toBeTruthy()
	})

	it('should renders horizontal layout with subheader', async () => {
		const {getByTestId, getByText} = await renderWithAct(
			<Divider
				layout={LAYOUT.HORIZONTAL}
				subheader='Section A'
				testID='divider'
			/>
		)

		const {subheader, section} = await waitFor(() => ({
			section: getByText('Section A'),
			subheader: getByTestId('divider__subheader--test-id')
		}))

		expect(section).toBeTruthy()
		expect(subheader).toBeTruthy()
	})

	it('should renders vertical layout without subheader', async () => {
		const {getByTestId, queryByTestId} = await renderWithAct(
			<Divider
				layout={LAYOUT.VERTICAL}
				testID='divider'
			/>
		)

		const {divider, content, subheader} = await waitFor(() => ({
			content: getByTestId('divider__content--test-id'),
			divider: getByTestId('divider'),
			subheader: queryByTestId('divider__subheader--test-id')
		}))

		expect(content).toBeTruthy()
		expect(divider).toBeTruthy()
		expect(subheader).toBeNull()
	})

	it('should applies size SMALL when subheader is present and layout is horizontal', async () => {
		const {getByTestId} = await renderWithAct(
			<Divider
				layout={LAYOUT.HORIZONTAL}
				subheader='Text'
				testID='divider'
			/>
		)

		const divider = await waitFor(() => getByTestId('divider'))

		expect(divider).toBeTruthy()
	})

	it('should supports custom size prop', async () => {
		const {getByTestId} = await renderWithAct(
			<Divider
				layout={LAYOUT.VERTICAL}
				size='SMALL'
				testID='divider'
			/>
		)

		const divider = await waitFor(() => getByTestId('divider'))

		expect(divider).toBeTruthy()
	})
})
