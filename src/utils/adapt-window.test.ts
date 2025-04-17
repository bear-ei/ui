import {PixelRatio} from 'react-native'
import {adaptWindow} from './adapt-window.utils'

jest.mock('react-native', () => ({
	PixelRatio: {
		getFontScale: jest.fn()
	}
}))

describe('adaptWindow', () => {
	beforeEach(() => {
		;(PixelRatio.getFontScale as jest.Mock).mockReturnValue(1)
	})

	it('adapts size and font size correctly with default config', () => {
		const {adaptFontSize, adaptSize} = adaptWindow()()()

		expect(adaptSize(10)).toBeGreaterThan(0)
		expect(adaptFontSize(10)).toBeGreaterThan(0)
	})

	it('returns identity functions in desktop mode', () => {
		const {adaptFontSize, adaptSize} = adaptWindow()()(true)

		expect(adaptSize(10)).toBe(10)
		expect(adaptFontSize(10)).toBe(10)
	})

	it('calculates scale based on screen and design dimensions', () => {
		const {adaptFontSize, adaptSize} = adaptWindow({
			screenWidth: 640,
			screenHeight: 1136
		})({
			designWidth: 320,
			designHeight: 568,
			designDensity: 2
		})()

		const font = adaptFontSize(10)
		const size = adaptSize(10)

		expect(font).toBe(40) // ✅
		expect(size).toBe(40)
	})
	it('respects PixelRatio font scale', () => {
		;(PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.5)

		const {adaptFontSize} = adaptWindow()()()
		expect(adaptFontSize(10)).toBeGreaterThan(10)
	})
})
