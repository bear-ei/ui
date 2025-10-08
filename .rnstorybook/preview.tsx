import type {Preview} from '@storybook/react'
import {View} from 'react-native'
import {ThemeProvider} from '../contexts'
import '../global.css'

const preview: Preview = {
        decorators: [
                Story => (
                        <ThemeProvider>
                                <View
                                        testID='story'
                                        style={{minHeight: 800, minWidth: 800}}
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
