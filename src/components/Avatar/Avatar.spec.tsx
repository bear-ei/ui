import {SHAPE} from '@bearei/material-token'
import {createRef} from 'react'
import type {View} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from '../Avatar'

describe('<Avatar />', () => {
	it('renders fallback labelText when no image or defaultSource is provided', () => {
		const {getByTestId, getByText} = renderWithTheme(<Avatar labelText='Z' />)
		const label = getByTestId(/avatar__labelText--/)
		expect(label).toBeTruthy()
		expect(getByText('Z')).toBeTruthy()
	})

	it('renders first letter of labelText if longer than 1 character', () => {
		const {getByText} = renderWithTheme(<Avatar labelText='Alice' />)
		expect(getByText('A')).toBeTruthy()
	})

	it('renders image when source is provided', () => {
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

	it('renders image when defaultSource is provided', () => {
		const defaultSource = {uri: 'https://example.com/default.png'}
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				labelText='Y'
				defaultSource={defaultSource}
			/>
		)
		expect(getByTestId(/avatar__image--/)).toBeTruthy()
		expect(queryByTestId(/avatar__labelText--/)).toBeNull()
	})

	it('applies shape and size props', () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				shape={SHAPE.FULL}
				size={72}
				labelText='A'
			/>
		)
		const content = getByTestId(/avatar__content--/)
		expect(content.props.shape).toBe(SHAPE.FULL)
		expect(content.props.size).toBe(72)
	})

	it('respects custom testID', () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				testID='custom-avatar'
				labelText='B'
			/>
		)
		expect(getByTestId('custom-avatar')).toBeTruthy()
	})

	it('sets accessibilityRole to image', () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='C' />)
		const avatarContainer = getByTestId(/avatar--/)
		expect(avatarContainer.props.accessibilityRole).toBe('image')
	})

	it('forwards ref correctly to container', () => {
		const ref = createRef<View>()
		renderWithTheme(
			<Avatar
				ref={ref}
				labelText='D'
			/>
		)
		expect(ref.current).not.toBeNull()
	})

	it('renders without crashing', () => {
		expect(() => renderWithTheme(<Avatar labelText='E' />)).not.toThrow()
	})
})
