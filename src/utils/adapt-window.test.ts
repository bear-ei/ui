import {PixelRatio} from 'react-native'
import {adaptWindow} from './adapt-window.utils'

describe('adaptWindow', () => {
	const originalGetFontScale = PixelRatio.getFontScale

	beforeEach(() => {
		PixelRatio.getFontScale = jest.fn(() => 1)
	})

	afterEach(() => {
		PixelRatio.getFontScale = originalGetFontScale
	})

	it('should return original size and font size when desktop is true', () => {
		const adapt = adaptWindow()()
		const result = adapt(true)

		expect(result.adaptFontSize(10)).toBe(10)
		expect(result.adaptSize(10)).toBe(10)
	})

	it('should adapt size and font size when desktop is false', () => {
		const adapt = adaptWindow({screenWidth: 1000, screenHeight: 2000})()
		const result = adapt(false)

		expect(result.adaptFontSize(10)).toBe(74)
		expect(result.adaptSize(10)).toBe(74)
	})

	it('should adapt size and font size with default values', () => {
		const adapt = adaptWindow()()
		const result = adapt()

		expect(result.adaptFontSize(10)).toBe(90)
		expect(result.adaptSize(10)).toBe(90)
	})

	it('should adapt size and font size with custom design options', () => {
		const adapt = adaptWindow({screenWidth: 1000, screenHeight: 2000})({
			designWidth: 500,
			designHeight: 1000
		})

		const result = adapt()

		expect(result.adaptFontSize(10)).toBe(60)
		expect(result.adaptSize(10)).toBe(60)
	})

	it('should adapt size and font size with custom font scale', () => {
		PixelRatio.getFontScale = jest.fn(() => 2)

		const adapt = adaptWindow({screenWidth: 1000, screenHeight: 2000})()
		const result = adapt()

		expect(result.adaptFontSize(10)).toBe(148)
		expect(result.adaptSize(10)).toBe(74)
	})
})
