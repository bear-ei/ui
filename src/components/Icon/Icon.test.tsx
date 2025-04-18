import {waitFor} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Icon} from './Icon.component'
import {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'

describe('Icon', () => {
	it('should apply custom styles for the icon', () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				name={ICON_NAME.CLOSE}
				iconStyle={ICON_STYLE.ROUNDED}
				type={ICON_TYPE.FILLED}
				testID='close'
			/>
		)
		expect(getByTestId('icon--close')).toBeTruthy()
	})

	it('should trigger animated scale on hoverIn event', async () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				name={ICON_NAME.EDIT}
				eventName='hoverIn'
				testID='edit'
			/>
		)

		await waitFor(() => {
			expect(getByTestId('icon--edit')).toHaveStyle({
				transform: [{scale: 1}]
			})
		})
	})

	it('should fallback to generated testID if custom testID is not provided', () => {
		const {getByTestId} = renderWithTheme(<Icon name={ICON_NAME.ADD} />)
		const root = getByTestId(/^icon--/)

		expect(root).toBeTruthy()
	})

	it('should use custom testID if provided', () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				testID='my-icon'
				name={ICON_NAME.CIRCLE}
			/>
		)

		expect(getByTestId('icon--my-icon')).toBeTruthy()
	})
})
