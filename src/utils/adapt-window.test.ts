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

	it('should return default scale when no parameters are provided', () => {
		const adapt = adaptWindow()()()

		expect(adapt.adaptSize(10)).toBe(10)
		expect(adapt.adaptFontSize(10)).toBe(10)
	})

	it('should return custom scale when parameters are provided', () => {
		const adapt = adaptWindow({screenWidth: 1000, screenHeight: 2000})({
			designWidth: 500,
			designHeight: 1000,
			designDensity: 2
		})()

		expect(adapt.adaptSize(10)).toBe(10)
		expect(adapt.adaptFontSize(10)).toBe(10)
	})

	it('should return original size when desktop is true', () => {
		const adapt = adaptWindow()({})(true)

		expect(adapt.adaptSize(10)).toBe(10)
		expect(adapt.adaptFontSize(10)).toBe(10)
	})

	it('should return scaled size when desktop is false', () => {
		const adapt = adaptWindow({screenWidth: 1000, screenHeight: 2000})({
			designWidth: 500,
			designHeight: 1000,
			designDensity: 2
		})(false)

		expect(adapt.adaptSize(10)).toBe(10)
		expect(adapt.adaptFontSize(10)).toBe(10)
	})

	it('should apply font scale correctly', () => {
		PixelRatio.getFontScale = jest.fn(() => 1.5)

		const adapt = adaptWindow()({})(false)

		expect(adapt.adaptFontSize(10)).toBe(15)
	})
})
