import type {Preview} from '@storybook/react-native-web-vite'
import {ThemeProvider} from '../contexts'
import '../global.css'

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
                                date: /Date$/i
                        }
                }
        }
}

export default preview
