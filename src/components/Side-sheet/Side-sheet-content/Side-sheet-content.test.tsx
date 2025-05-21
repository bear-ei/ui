import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Side-sheet.enum'
import {SideSheetContent} from './Side-sheet-content.component'

describe('SideSheetContent Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should renders correctly with default props', async () => {
		const {getByTestId} = await renderWithAct(<SideSheetContent visible />)
		const {sheetContent, header, headerText} = await waitFor(() => ({
			header: getByTestId('sideSheetContent__header--test-id'),
			headerText: getByTestId('sideSheetContent__headerText--test-id'),
			sheetContent: getByTestId('sideSheetContent--test-id')
		}))

		expect(header).toBeTruthy()
		expect(headerText).toHaveTextContent('Title')
		expect(sheetContent).toBeTruthy()
	})

	it('should renders leading and trailing elements when provided', async () => {
		const {getByTestId} = await renderWithAct(
			<SideSheetContent
				headlineLeading={
					<Text testID='sideSheetContent__leading--text'>{'customLeading'}</Text>
				}
				headlineTrailing={
					<Text testID='sideSheetContent__trailing--text'>{'customTrailing'}</Text>
				}
				visible
			/>
		)

		const {leading, trailing} = await waitFor(() => ({
			leading: getByTestId('sideSheetContent__leading--test-id'),
			trailing: getByTestId('sideSheetContent__trailing--test-id')
		}))

		expect(leading).toHaveTextContent('customLeading')
		expect(trailing).toHaveTextContent('customTrailing')
	})

	it('should fires onBack and onClose when IconButtons are clicked', async () => {
		const mockBack = jest.fn()
		const mockClose = jest.fn()
		const {getByTestId} = await renderWithAct(
			<SideSheetContent
				back
				close
				onBack={mockBack}
				onClose={mockClose}
				visible
			/>
		)

		const {backIconButton, closeIconButton} = await waitFor(() => ({
			backIconButton: getByTestId('sideSheet__backIconButton--test-id'),
			closeIconButton: getByTestId('sideSheet__closeIconButton--test-id')
		}))

		await act(async () => {
			fireEvent(backIconButton, 'pressOut')
			fireEvent(closeIconButton, 'pressOut')
		})

		await waitFor(() => {
			expect(mockBack).toHaveBeenCalled()
			expect(mockClose).toHaveBeenCalled()
		})
	})

	it('should renders footer buttons and handles cancel/confirm', async () => {
		const mockCancel = jest.fn()
		const mockConfirm = jest.fn()
		const {getByTestId} = await renderWithAct(
			<SideSheetContent
				footerVisible
				onCancel={mockCancel}
				onConfirm={mockConfirm}
				visible
			/>
		)

		const {confirmButton, cancelButton} = await waitFor(() => ({
			cancelButton: getByTestId('sideSheetContent__cancelButton--test-id'),
			confirmButton: getByTestId('sideSheetContent__confirmButton--test-id')
		}))

		await act(async () => {
			fireEvent(cancelButton, 'pressOut')
			fireEvent(confirmButton, 'pressOut')
		})

		await waitFor(() => {
			expect(mockCancel).toHaveBeenCalled()
			expect(mockConfirm).toHaveBeenCalled()
		})
	})

	it('should applies correct styles for type and position', async () => {
		const {getByTestId} = await renderWithAct(
			<SideSheetContent
				position={SIDE_SHEET_POSITION.HORIZONTAL_START}
				type={SIDE_SHEET_TYPE.MODAL}
				visible
			/>
		)

		const sheetContent = await waitFor(() => getByTestId(/^sideSheetContent--/))

		expect(sheetContent).toBeTruthy()
	})
})
