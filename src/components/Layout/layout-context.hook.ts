import {createContext, useContext} from 'react'

export const LayoutContext = createContext<{pane?: number}>({pane: undefined})
export const useLayoutContext = () => {
    const contextValue = useContext(LayoutContext)

    if (!contextValue) {
        throw new Error('useLayoutContext must be used within a LayoutProvider')
    }

    return contextValue
}
