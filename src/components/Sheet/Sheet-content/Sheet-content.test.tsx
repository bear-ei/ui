import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Sheet.enum'
import {SheetContent} from './Sheet-content.component'

describe('SheetContent Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = await renderWithAct(<SheetContent visible />)
		const {sheetContent, header, headerText} = await waitFor(() => ({
			header: getByTestId('sheetContent__header--test-id'),
			headerText: getByTestId('sheetContent__headerText--test-id'),
			sheetContent: getByTestId('sheetContent--test-id')
		}))

		expect(header).toBeTruthy()
		expect(headerText).toHaveTextContent('Title')
		expect(sheetContent).toBeTruthy()
	})

	it('should renders leading and trailing elements when provided', async () => {
		const {getByTestId} = await renderWithAct(
			<SheetContent
				headlineLeading={<Text testID='sheetContent__leading--text'>{'customLeading'}</Text>}
				headlineTrailing={<Text testID='sheetContent__trailing--text'>{'customTrailing'}</Text>}
				visible
			/>
		)

		const {leading, trailing} = await waitFor(() => ({
			leading: getByTestId('sheetContent__leading--test-id'),
			trailing: getByTestId('sheetContent__trailing--test-id')
		}))

		expect(leading).toHaveTextContent('customLeading')
		expect(trailing).toHaveTextContent('customTrailing')
	})

	it('should fires onBack and onClose when IconButtons are clicked', async () => {
		const mockBack = jest.fn()
		const mockClose = jest.fn()
		const {getByTestId} = await renderWithAct(
			<SheetContent
				back
				close
				onBack={mockBack}
				onClose={mockClose}
				visible
			/>
		)

		const {backIconButton, closeIconButton} = await waitFor(() => ({
			backIconButton: getByTestId('sheet__backIconButton--test-id'),
			closeIconButton: getByTestId('sheet__closeIconButton--test-id')
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
			<SheetContent
				footerVisible
				onCancel={mockCancel}
				onConfirm={mockConfirm}
				visible
			/>
		)

		const {confirmButton, cancelButton} = await waitFor(() => ({
			cancelButton: getByTestId('sheetContent__cancelButton--test-id'),
			confirmButton: getByTestId('sheetContent__confirmButton--test-id')
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
			<SheetContent
				position={SIDE_SHEET_POSITION.HORIZONTAL_START}
				type={SIDE_SHEET_TYPE.MODAL}
				visible
			/>
		)

		const sheetContent = await waitFor(() => getByTestId(/^sheetContent--/))

		expect(sheetContent).toBeTruthy()
	})
})
