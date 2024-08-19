import React, {FC, useId} from 'react'
import StorybookUIRoot from '../.ondevice'
import {Container, Text} from './App.style'
import {ThemeProvider} from './context'

const App: FC = () => {
    const id = useId()

    return (
        <ThemeProvider>
            <Container testID={`app__container--${id}`}>
                <Text testID={`app__containerText--${id}`}>Open up App.tsx to start working on your app!</Text>
            </Container>
        </ThemeProvider>
    )
}

const AppEntryPoint = process.env.STORYBOOK_ENABLED ? StorybookUIRoot : App

export default AppEntryPoint
