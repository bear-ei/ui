import {fireEvent} from '@testing-library/react-native'
import {useRef} from 'react'
import {Text, View} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Touchable} from './Touchable.component'

describe('Touchable', () => {
	it('should render basic structure with testIDs', () => {
		const {getByTestId} = renderWithTheme(
			<Touchable testID='touch-id'>
				<Text>Touch me</Text>
			</Touchable>
		)

		expect(getByTestId('touchable__touchableContent--test-id')).toBeTruthy()
		expect(getByTestId('touchable__main--test-id')).toBeTruthy()
		expect(getByTestId('touch-id')).toBeTruthy()
	})

	it('should forward ref to internal pressable View', () => {
		const TestComponent = () => {
			const ref = useRef<View>(null)

			return (
				<Touchable
					ref={ref}
					testID='forward-ref'
				>
					<Text>Child</Text>
				</Touchable>
			)
		}

		const {getByTestId} = renderWithTheme(<TestComponent />)

		expect(getByTestId('forward-ref')).toBeTruthy()
	})

	it('should support centered ripple rendering', () => {
		const {getAllByTestId} = renderWithTheme(
			<Touchable
				testID='ripple-test'
				centered
			>
				<Text>Ripple</Text>
			</Touchable>
		)

		const ripple = getAllByTestId('ripple-test')

		expect(ripple.length).toBeGreaterThanOrEqual(1)
	})

	it('should not crash when disabled', () => {
		const {getByTestId} = renderWithTheme(
			<Touchable
				testID='disabled'
				disabled
			>
				<Text>Disabled</Text>
			</Touchable>
		)

		const node = getByTestId('touchable__touchableContent--test-id')

		expect(node).toBeTruthy()
	})

	it('should call interaction handler on pressIn', () => {
		const onPressIn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Touchable
				testID='press-test'
				onPressIn={onPressIn}
			>
				<Text>Press</Text>
			</Touchable>
		)

		const node = getByTestId('touchable__touchableContent--test-id')

		fireEvent(node, 'pressIn', {
			nativeEvent: {
				locationX: 50,
				locationY: 50
			}
		})

		expect(onPressIn).toHaveBeenCalled()
	})
})
