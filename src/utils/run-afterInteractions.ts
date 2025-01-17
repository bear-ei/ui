import {InteractionManager} from 'react-native'

export const runAfterInteractions =
        <T extends (...args: any[]) => unknown>(func?: T) =>
        (...args: Parameters<T>) =>
                InteractionManager.runAfterInteractions(() => func?.(...args))
