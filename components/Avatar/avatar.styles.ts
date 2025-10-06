import {commonShapeClasses, commonTypographyClasses} from '@/constants'
import {SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {AvatarContentProps} from './Avatar.interface'

export const containerClasses = ({backgroundColor, size, shape}: AvatarContentProps) => {
        const baseClasses = 'pointer-events-none relative overflow-hidden'
        const sizeClasses = size ? `w-[${size}px] h-[${size}px]` : 'w-10 h-10'
        const bgClasses = backgroundColor ? `bg-[${backgroundColor}]` : 'bg-[--color-primary-container]'
        const shapeClasses = commonShapeClasses(shape)

        return clsx(baseClasses, sizeClasses, bgClasses, shapeClasses)
}

export const contentItemClasses = () => {
        const baseClasses =
                'absolute bottom-[0px] left-[0px] right-[0px] top-[0px] flex flex-row items-center justify-center'

        return clsx(baseClasses)
}

export const labelTextClasses = () => {
        const baseClasses = 'color-[--color-on-primary-container]'
        const typographyClasses = commonTypographyClasses(TYPOGRAPHY.TITLE)(SIZE.MEDIUM)

        return clsx(baseClasses, typographyClasses)
}
