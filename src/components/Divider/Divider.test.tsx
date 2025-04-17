import {SIZE} from '@bearei/material-token'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {LAYOUT} from '../Common'
import {Divider} from './Divider.component'

describe('Divider', () => {
	it('should render horizontal divider with default props', () => {
		const {getByTestId} = renderWithTheme(<Divider />)

		const container = getByTestId(/^divider--/)
		const content = getByTestId(/^divider__content--/)

		expect(container).toBeTruthy()
		expect(content).toBeTruthy()
	})

	it('should render vertical layout', () => {
		const {getByTestId} = renderWithTheme(<Divider layout={LAYOUT.VERTICAL} />)

		const container = getByTestId(/^divider--/)
		expect(container).toBeTruthy()
	})

	it('should apply small size when subheader exists and layout is horizontal', () => {
		const {getByTestId} = renderWithTheme(
			<Divider
				layout={LAYOUT.HORIZONTAL}
				subheader='Section Title'
			/>
		)

		const subheader = getByTestId(/^divider__subheader--/)
		expect(subheader).toBeTruthy()
	})

	it('should not render subheader when not provided', () => {
		const {queryByTestId} = renderWithTheme(<Divider layout={LAYOUT.HORIZONTAL} />)
		const subheader = queryByTestId(/^divider__subheader--/)

		expect(subheader).toBeNull()
	})

	it('should accept custom size explicitly', () => {
		const {getByTestId} = renderWithTheme(<Divider size={SIZE.SMALL} />)
		const container = getByTestId(/^divider--/)

		expect(container).toBeTruthy()
	})
})
