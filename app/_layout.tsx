import {Stack} from 'expo-router'
import {FC} from 'react'
import 'react-native-reanimated'
import '../global.css'

const StorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
const RootLayout: FC = () => (
        <Stack screenOptions={{headerShown: false}}>
                <Stack.Protected guard={StorybookEnabled}>
                        <Stack.Screen name='(storybook)' />
                </Stack.Protected>

                <Stack.Screen name='(pages)' />
        </Stack>
)

export default RootLayout
