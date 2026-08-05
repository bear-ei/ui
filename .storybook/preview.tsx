import type {Preview} from '@storybook/react-native-web-vite'
import {View} from 'react-native'
import '../global.css'
import {ThemeProvider} from '../src/contexts'

const preview: Preview = {
    decorators: [
        Story => (
            <ThemeProvider>
                <View
                    testID='story'
                    style={{height: 800}}
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
                date: /Date$/i
            }
        }
    }
}

export default preview
