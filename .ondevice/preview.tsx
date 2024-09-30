import type {Preview} from '@storybook/react'
import {ThemeProvider} from '../src/context'

const preview: Preview = {
    decorators: [
        Story => (
            <ThemeProvider story={true}>
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
