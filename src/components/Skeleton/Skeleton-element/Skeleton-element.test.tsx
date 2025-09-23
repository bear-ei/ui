import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {LAYOUT} from '../../Common'
import {SkeletonElement} from './Skeleton-element.component'

describe('SkeletonElement Component', () => {
	it('should render without crashing', async () => {
		const {getByTestId} = await renderWithAct(<SkeletonElement />)
		const element = await waitFor(() => getByTestId('skeletonElement--test-id'))

		expect(element).toBeTruthy()
	})

	it('should render with children', async () => {
		const {getByText} = await renderWithAct(
			<SkeletonElement>
				<Text>Loading...</Text>
			</SkeletonElement>
		)

		const loading = await waitFor(() => getByText('Loading...'))

		expect(loading).toBeTruthy()
	})

	it('should apply horizontal layout by default', async () => {
		const {getByTestId} = await renderWithAct(<SkeletonElement />)
		const element = await waitFor(() => getByTestId('skeletonElement--test-id'))

		expect(element.props.layout).toBeUndefined()
	})

	it('should allow vertical layout when layout prop is set', async () => {
		const {getByTestId} = await renderWithAct(<SkeletonElement layoutType={LAYOUT.VERTICAL} />)
		const element = await waitFor(() => getByTestId('skeletonElement--test-id'))

		expect(element.props.layout).toBe('VERTICAL')
	})
})
