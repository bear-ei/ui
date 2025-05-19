import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {LAYOUT} from '../Common'
import {Divider} from './Divider.component'

describe('Divider Component', () => {
	it('should renders with default props', async () => {
		const {getByTestId} = renderWithTheme(<Divider testID='divider' />)

		await waitFor(() => {
			expect(getByTestId('divider')).toBeTruthy()
			expect(getByTestId('divider__content--test-id')).toBeTruthy()
		})
	})

	it('should renders horizontal layout with subheader', async () => {
		const {getByTestId, getByText} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.HORIZONTAL}
				subheader='Section A'
			/>
		)

		await waitFor(() => {
			expect(getByTestId('divider__subheader--test-id')).toBeTruthy()
			expect(getByText('Section A')).toBeTruthy()
		})
	})

	it('should renders vertical layout without subheader', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.VERTICAL}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('divider')).toBeTruthy()
			expect(getByTestId('divider__content--test-id')).toBeTruthy()
			expect(queryByTestId('divider__subheader--test-id')).toBeNull()
		})
	})

	it('should applies size SMALL when subheader is present and layout is horizontal', async () => {
		const {getByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.HORIZONTAL}
				subheader='Text'
			/>
		)

		await waitFor(() => {
			expect(getByTestId('divider')).toBeTruthy()
		})
	})

	it('should supports custom size prop', async () => {
		const {getByTestId} = renderWithTheme(
			<Divider
				testID='divider'
				layout={LAYOUT.VERTICAL}
				size='SMALL'
			/>
		)

		await waitFor(() => {
			expect(getByTestId('divider')).toBeTruthy()
		})
	})
})
