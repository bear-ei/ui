import type {Preview} from '@storybook/react'
import {View, type ViewStyle} from 'react-native'
import {ThemeProvider} from '../src/contexts'

const style = [{minHeight: 800}] as ViewStyle
const preview: Preview = {
	decorators: [
		Story => (
			<ThemeProvider>
				<View
					style={style}
					testID='story'
				>
					<Story />
				</View>
			</ThemeProvider>
		)
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
}

export default preview
