import {DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {FC} from 'react'
import 'react-native-reanimated'
import '../global.css'

const RootLayout: FC = () => (
        <ThemeProvider value={DefaultTheme}>
                <Stack>
                        <Stack.Screen
                                name='(tabs)'
                                options={{headerShown: false}}
                        />
                </Stack>
                <StatusBar style='auto' />
        </ThemeProvider>
)

export default RootLayout
