import {renderWithTheme} from '../../../../__test__'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import {SideSheetContent} from './Side-sheet-content.component'

describe('SideSheetContent', () => {
	const defaultProps = {
		testID: 'sideSheetContent',
		headlineText: 'Sheet Title',
		content: <></>,
		visible: true,
		footerVisible: true,
		onConfirm: jest.fn(),
		onCancel: jest.fn(),
		onBack: jest.fn(),
		onClose: jest.fn()
	}

	it('should render all major sections with default props', () => {
		const {getByTestId} = renderWithTheme(<SideSheetContent {...defaultProps} />)

		expect(getByTestId('sideSheetContent')).toBeTruthy()
		expect(getByTestId('sideSheetContent__content--test-id')).toBeTruthy()
		expect(getByTestId('sideSheetContent__header--test-id')).toBeTruthy()
		expect(getByTestId('sideSheetContent__main--test-id')).toBeTruthy()
		expect(getByTestId('sideSheetContent__footerLayout--test-id')).toBeTruthy()
	})

	it('should use fallback shape based on position', () => {
		const {getByTestId} = renderWithTheme(
			<SideSheetContent
				{...defaultProps}
				shape={undefined}
				position={SIDE_SHEET_POSITION.HORIZONTAL_START}
			/>
		)

		expect(getByTestId('sideSheetContent__content--test-id')).toBeTruthy()
	})
})
