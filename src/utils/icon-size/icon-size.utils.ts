import type {Theme} from '@/contexts'
import {type Size, SIZE} from '@bearei/theme-token'

export const processIconSize = (theme: Theme) => (size: Size) => {
        const iconSize = {
                [SIZE.EXTRA_LARGE]: theme.token.spacing.extraSmall * 7,
                [SIZE.EXTRA_SMALL]: theme.token.spacing.extraSmall * 3,
                [SIZE.LARGE]: theme.token.spacing.large,
                [SIZE.MEDIUM]: theme.token.spacing.extraSmall * 5,
                [SIZE.SMALL]: theme.token.spacing.medium
        }

        return iconSize[size]
}
