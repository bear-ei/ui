import type {View} from 'react-native'

export const handleThemeProviderFocus = (ref: React.RefObject<View>) => () => ref.current?.focus()
