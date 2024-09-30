import {WindowSize} from './hook.interface'
import {useWindowDimensions} from './use-window-dimensions.hook'

export const useWindowSize = (): WindowSize => {
    const {width} = useWindowDimensions({inspectionPlatform: false})

    let windowSize!: WindowSize

    switch (true) {
        case width >= 0 && width < 600:
            windowSize = 'compact'
            break
        case width >= 600 && width < 840:
            windowSize = 'medium'
            break
        case width >= 840 && width < 1200:
            windowSize = 'expanded'
            break
        case width >= 1200 && width < 1600:
            windowSize = 'large'
            break

        default:
            windowSize = 'medium'
    }

    return windowSize
}
