import {useTheme} from '@/hooks'
import {classesName} from '@/utils'
import {hexToRGBA} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {Pressable, View, type ViewStyle} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderMaskProps} from './Mask.interface'

export const RenderMask = forwardRef<View, RenderMaskProps>(
    (
        {backgroundColor, className, id, interactionHandlers, opacity = 0.2, style, testID, visible, ...containerProps},
        ref
    ) => {
        const theme = useTheme()
        const maskStyle = {
            backgroundColor: hexToRGBA(backgroundColor ?? theme.token.scheme.scrim)(opacity)
        } as ViewStyle

        return (
            <LayoutAnimated
                {...containerProps}
                visible={visible}
                accessibilityRole='alert'
                accessible={true}
                className={classesName(
                    'absolute bottom-0 left-0 right-0 top-0 cursor-default',
                    {
                        ['overflow-hidden']: !visible,
                        ['z-40']: visible
                    },
                    className
                )}
                ref={ref}
                testID={testID ?? `mask--${id}`}
                style={[style, maskStyle]}
            >
                <Pressable
                    {...interactionHandlers}
                    className='flex-1 outline-none'
                    testID={`mask__content--${id}`}
                />
            </LayoutAnimated>
        )
    }
)

RenderMask.displayName = 'RenderMask'
