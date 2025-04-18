import {screen} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('renderAvatar', () => {
	it('renders Image when source is provided', () => {
		const props = {
			source: {uri: 'https://example.com/image.jpg'},
			testID: 'test-avatar'
		}

		renderWithTheme(<Avatar {...props} />)
		expect(screen.getByTestId('avatar--test-avatar')).toBeDefined()
	})

	it('renders Image when defaultSource is provided and source is not', () => {
		const props = {
			defaultSource: {uri: 'https://example.com/default.jpg'},
			testID: 'test-avatar'
		}

		renderWithTheme(<Avatar {...props} />)
		expect(screen.getByTestId('avatar__image--test-avatar')).toBeDefined()
	})

	// it('renders LabelText when source and defaultSource are not provided', () => {
	// 	const props = {
	// 		labelText: 'Test Label',
	// 		testID: 'test-avatar'
	// 	}
	// 	renderWithTheme(renderAvatar(props))
	// 	expect(screen.getByTestId('avatar__labelText--test-avatar')).toHaveTextContent('Test Label')
	// })

	// it('sets accessibilityLabel correctly when labelText is provided', () => {
	// 	const props = {
	// 		labelText: 'Test Label',
	// 		testID: 'test-avatar'
	// 	}
	// 	renderWithTheme(renderAvatar(props))
	// 	expect(screen.getByTestId('avatar--test-avatar')).toHaveAccessibilityLabel('Avatar: Test Label')
	// })

	// it('sets backgroundColor, density, shape, and size correctly', () => {
	// 	const props = {
	// 		backgroundColor: 'blue',
	// 		density: 2,
	// 		shape: SHAPE.ROUNDED,
	// 		size: SIZE.LARGE,
	// 		testID: 'test-avatar'
	// 	}
	// 	renderWithTheme(renderAvatar(props))
	// 	expect(screen.getByTestId('avatar__content--test-avatar')).toHaveStyle({
	// 		backgroundColor: 'blue',
	// 		borderRadius: SIZE.LARGE / 2 // Assuming borderRadius is set based on size
	// 	})
	// })
})
