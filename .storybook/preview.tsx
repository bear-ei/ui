import type {Preview} from '@storybook/react'
import {ThemeProvider} from '../src/contexts'

const preview: Preview = {
	decorators: [
		Story => (
			<ThemeProvider>
				<Story />
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
