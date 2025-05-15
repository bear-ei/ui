import type {View} from 'react-native'

export const focusThemeProvider = (ref: React.RefObject<View>) => () => ref.current?.focus()
