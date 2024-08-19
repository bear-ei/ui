import {Preview} from '@storybook/react'
import React from 'react'
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
        actions: {argTypesRegex: '^on[A-Z].*'},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
}

export default preview
