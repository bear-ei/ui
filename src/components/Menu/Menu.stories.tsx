import type {Meta} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'
import {useMemo, useState} from 'react'
import {View} from 'react-native'

import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {LIST_SELECTION_TYPE, LIST_TYPE} from '../List'
import {Menu} from './Menu.component'

export const Select = () => {
	const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
	const data = useMemo(
		() =>
			Array.from({length: 2}, (_, index) => ({
				extraData: [],
				headline: `Title${index + 1}`,
				itemKey: `Title${index + 1}`,
				leading: <Circle />
			})),
		[]
	)

	const onActiveKey = (key?: string) => setActiveKey(key)

	return (
		<View className='flex h-[800px] w-[800px] items-center justify-center'>
			<View className='h-8 w-8'>
				<Menu
					activeKey={activeKey}
					afterAffordance={true}
					data={data}
					listType={LIST_TYPE.LABEL}
					// loading={true}
					onActiveKeyChange={onActiveKey}
					selectionType={LIST_SELECTION_TYPE.SINGLE}
				>
					<IconButton type={ICON_BUTTON_TYPE.STANDARD} />
				</Menu>
			</View>
		</View>
	)
}

export default {
	component: Menu,
	title: 'components/Menu'
} as Meta<typeof Menu>
