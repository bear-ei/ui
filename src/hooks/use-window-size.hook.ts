import {WindowSize} from '@bearei/material-token'
import {useWindowDimensions} from './use-window-dimensions.hook'

export const useWindowSize = () => {
        const {width, ...scaledSize} = useWindowDimensions({changeEventThrottle: 150})

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
                case width >= 1600:
                        windowSize = 'extraLarge'
                        break

                default:
                        windowSize = 'medium'
        }

        return {windowSize, width, ...scaledSize}
}
