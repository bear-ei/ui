import type {Meta} from '@storybook/react'
import type {ViewStyle} from 'react-native'
import {Text, View} from 'react-native'
import {Icon} from '../Icon'
import {VirtualList} from './Virtual-list.component'

export const BigVirtualList = () => {
	const style = {height: 800, width: '100%'} as ViewStyle
	const itemStyle = {
		height: 56,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle

	const data = Array.from({length: 5000}, (_, index) => ({
		indexKey: `Item${index + 1}`,
		headline: `Item${index + 1}`,
		afterAffordance: true,
		leading: <Icon />
	}))

	return (
		<View style={[style]}>
			<VirtualList
				data={data}
				itemSize={56}
				renderItem={({item}) => (
					<View
						key={item.indexKey}
						style={[itemStyle]}
					>
						<Text>{item.indexKey}</Text>
					</View>
				)}
			/>
		</View>
	)
}

export default {
	title: 'components/VirtualList',
	component: VirtualList
} as Meta<typeof VirtualList>
