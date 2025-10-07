import type {Preview} from '@storybook/react'
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
                                date: /Date$/
                        }
                }
        }
}

export default preview
