import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('Avatar', () => {
	it('should render with default label "A" if no labelText is provided', () => {
		const {getByTestId} = renderWithTheme(<Avatar />)
		const label = getByTestId(/avatar__labelText--/)

		expect(label.props.children).toBe('A')
	})

	it('should render first character of labelText when provided', () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='OpenAI' />)
		const label = getByTestId(/avatar__labelText--/)

		expect(label.props.children).toBe('O')
	})

	it('should render image if source is provided', () => {
		const source = {uri: 'https://example.com/avatar.png'}
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				labelText='X'
				source={source}
			/>
		)

		expect(getByTestId(/avatar__image--/)).toBeTruthy()
		expect(queryByTestId(/avatar__labelText--/)).toBeNull()
	})

	it('should render image if defaultSource is provided', () => {
		const defaultSource = {uri: 'https://example.com/default.png'}
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				labelText='X'
				defaultSource={defaultSource}
			/>
		)

		expect(getByTestId(/avatar__image--/)).toBeTruthy()
		expect(queryByTestId(/avatar__labelText--/)).toBeNull()
	})

	it('should fallback to generated testID if custom testID is not provided', () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='Z' />)
		const root = getByTestId(/^avatar--/)

		expect(root).toBeTruthy()
	})
	it('should use custom testID if provided', () => {
		const {getByTestId} = renderWithTheme(<Avatar testID='my-avatar' />)

		expect(getByTestId('avatar--my-avatar')).toBeTruthy()
		expect(getByTestId('avatar__content--my-avatar')).toBeTruthy()
	})

	it('should include accessibility label and role', () => {
		const {getByLabelText, getByRole, toJSON} = renderWithTheme(<Avatar labelText='A' />)

		expect(getByLabelText('Avatar: A')).toBeTruthy()
		expect(getByRole('image')).toBeTruthy()
		expect(toJSON()).toMatchSnapshot()
	})
})
