import {WindowSize} from './hooks.interface'
import {useWindowDimensions} from './use-window-dimensions'

export const useWindowSize = (): WindowSize => {
    const {width} = useWindowDimensions({inspectionPlatform: false})

    let windowSize!: 'compact' | 'medium' | 'expanded' | 'large' | 'extraLarge'

    width > 0 && width < 600 && (windowSize = 'compact')
    width >= 1200 && width < 1600 && (windowSize = 'large')
    width >= 1600 && (windowSize = 'extraLarge')
    width >= 600 && width < 840 && (windowSize = 'medium')
    width >= 840 && width < 1200 && (windowSize = 'expanded')

    return windowSize
}
