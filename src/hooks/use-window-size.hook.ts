import {WindowSize} from '@bearei/material-token'
import {useWindowDimensions} from './use-window-dimensions.hook'

export const useWindowSize = () => {
        const {width, ...scaledSize} = useWindowDimensions({changeEventThrottle: 150})

        let windowSize!: WindowSize

        switch (true) {
                case width >= 0 && width < 600:
                        windowSize = WindowSize.COMPACT
                        break
                case width >= 600 && width < 840:
                        windowSize = WindowSize.MEDIUM
                        break
                case width >= 840 && width < 1200:
                        windowSize = WindowSize.EXPANDED
                        break
                case width >= 1200 && width < 1600:
                        windowSize = WindowSize.LARGE
                        break
                case width >= 1600:
                        windowSize = WindowSize.EXTRA_LARGE
                        break

                default:
                        windowSize = WindowSize.MEDIUM
        }

        return {windowSize, width, ...scaledSize}
}
