import type {FC} from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ModalProvider} from '../Modal-provider'
import type {ThemeProps} from './Theme-provider.interface'

export const ThemeProvider: FC<ThemeProps> = ({children}) => (
        <GestureHandlerRootView>
                {children}
                <ModalProvider />
        </GestureHandlerRootView>
)
