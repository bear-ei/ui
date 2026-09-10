import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ListItem} from './List-item.component'
import type {ListItemProps} from './List-item.interface'

export const Item: StoryObj<ListItemProps> = {
	args: {
		headline: 'Item'
	}
}

export default {
	component: ListItem,
	title: 'components/ListItem'
} as Meta<typeof ListItem>
