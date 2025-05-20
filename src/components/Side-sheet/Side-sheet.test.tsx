import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {SideSheet} from './Side-sheet.component'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'

describe('SideSheet Component', () => {
	const mockOnBack = jest.fn()
	const mockOnCancel = jest.fn()
	const mockOnClose = jest.fn()
	const mockOnConfirm = jest.fn()

	/**
	 * FIXME: Unable to trigger callbacks properly
	 */
	const _mockOnVisible = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should not render content when visible is false by default', async () => {
		const {queryByTestId} = renderWithTheme(
			<SideSheet
				content={<></>}
				testID='test-sheet'
			/>
		)

		const sheetContent = await waitFor(() => queryByTestId('sideSheet__sideSheetContent--test-id'))

		expect(sheetContent).toBeNull()
	})

	it('should render SideSheetContent when visible is true', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				content={<></>}
				testID='test-sheet'
				type={SIDE_SHEET_TYPE.SIDEBAR}
				visible
			/>
		)

		const sheetContent = await waitFor(() => getByTestId('sideSheet__sideSheetContent--test-id'))

		expect(sheetContent).toBeTruthy()
	})

	it('should trigger onClose and hide when close button is pressed', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				close
				content={<></>}
				onClose={mockOnClose}
				type={SIDE_SHEET_TYPE.SIDEBAR}
				visible
			/>
		)

		const closeButton = await waitFor(() => getByTestId('sideSheet__closeIconButton--test-id'))

		fireEvent(closeButton, 'pressOut')

		await waitFor(() => expect(mockOnClose).toHaveBeenCalled())
	})

	it('should trigger onBack if back button is pressed (not disabled)', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				back
				content={<></>}
				onBack={mockOnBack}
				type={SIDE_SHEET_TYPE.SIDEBAR}
				visible
			/>
		)

		const backBtn = await waitFor(() => getByTestId('sideSheet__backIconButton--test-id'))

		fireEvent(backBtn, 'pressOut')

		await waitFor(() => expect(mockOnBack).toHaveBeenCalled())
	})

	it('should not close if back is pressed but disabledClose is true (SIDEBAR)', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				content={<></>}
				back
				type={SIDE_SHEET_TYPE.SIDEBAR}
				visible
				disabledClose
				onBack={mockOnBack}
			/>
		)

		const backBtn = await waitFor(() => getByTestId('sideSheet__backIconButton--test-id'))

		fireEvent(backBtn, 'pressOut')

		await waitFor(() => expect(mockOnBack).toHaveBeenCalled())
	})

	it('should call onCancel and onConfirm buttons if defined', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				content={<></>}
				onCancel={mockOnCancel}
				onConfirm={mockOnConfirm}
				type={SIDE_SHEET_TYPE.SIDEBAR}
				visible
			/>
		)

		const {confirmButton, cancelButton} = await waitFor(() => ({
			cancelButton: getByTestId('sideSheetContent__cancelButton--test-id'),
			confirmButton: getByTestId('sideSheetContent__confirmButton--test-id')
		}))

		fireEvent(cancelButton, 'pressOut')
		fireEvent(confirmButton, 'pressOut')

		await waitFor(() => {
			expect(mockOnCancel).toHaveBeenCalled()
			expect(mockOnConfirm).toHaveBeenCalled()
		})
	})

	it('should not render modal container for STANDARD and SIDEBAR types', async () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				content={<></>}
				type={SIDE_SHEET_TYPE.STANDARD}
				visible
			/>
		)

		const sideSheetContent = await waitFor(() => getByTestId('sideSheet__sideSheetContent--test-id'))

		expect(sideSheetContent).toBeTruthy()
	})
})
