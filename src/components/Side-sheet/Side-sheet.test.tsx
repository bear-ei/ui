import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {SideSheet} from './Side-sheet.component'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'

describe('SideSheet', () => {
	const baseProps = {
		testID: 'test-sideSheet',
		visible: true,
		content: <></>
	}

	it('should render SideSheetContent when type is STANDARD', () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				{...baseProps}
				type={SIDE_SHEET_TYPE.STANDARD}
			/>
		)

		expect(getByTestId('sideSheet__sideSheetContent--test-id')).toBeTruthy()
	})

	it('should render SideSheetContent when type is SIDEBAR', () => {
		const {getByTestId} = renderWithTheme(
			<SideSheet
				{...baseProps}
				type={SIDE_SHEET_TYPE.SIDEBAR}
			/>
		)

		expect(getByTestId('sideSheet__sideSheetContent--test-id')).toBeTruthy()
	})
})
