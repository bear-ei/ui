import {PixelRatio} from 'react-native'
import {adaptWindow} from './adapt-window.utils'

jest.mock('react-native', () => ({
	PixelRatio: {
		getFontScale: jest.fn()
	}
}))

describe('adaptWindow', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		;(PixelRatio.getFontScale as jest.Mock).mockReturnValue(1)
	})

	it('should use default screen and design options', () => {
		const adapt = adaptWindow()()
		const result = adapt()
		expect(typeof result.adaptFontSize).toBe('function')
		expect(typeof result.adaptSize).toBe('function')
	})

	it('should adapt font size and size for mobile', () => {
		;(PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.2)

		const adapt = adaptWindow()()
		const {adaptFontSize, adaptSize} = adapt()

		expect(adaptFontSize(10)).toBe(Math.max(0, Math.round(10 * 9 * 1.2)))
		expect(adaptSize(10)).toBe(Math.max(0, Math.round(10 * 9)))
	})

	it('should adapt font size and size for desktop (no scaling)', () => {
		const adapt = adaptWindow()()
		const {adaptFontSize, adaptSize} = adapt(true)

		expect(adaptFontSize(10)).toBe(10)
		expect(adaptSize(10)).toBe(10)
		expect(adaptFontSize(-5)).toBe(0)
		expect(adaptSize(-5)).toBe(0)
	})

	it('should support custom screen and design options', () => {
		;(PixelRatio.getFontScale as jest.Mock).mockReturnValue(1)

		const adapt = adaptWindow({screenWidth: 1440, screenHeight: 2560})({
			designWidth: 360,
			designHeight: 640,
			designDensity: 4
		})
		const {adaptFontSize, adaptSize} = adapt()

		expect(adaptFontSize(8)).toBe(Math.max(0, Math.round(8 * 16 * 1)))
		expect(adaptSize(8)).toBe(Math.max(0, Math.round(8 * 16)))
	})

	it('should clamp negative results to 0', () => {
		const adapt = adaptWindow()()
		const {adaptFontSize, adaptSize} = adapt()

		expect(adaptFontSize(-10)).toBe(0)
		expect(adaptSize(-10)).toBe(0)
	})
})
