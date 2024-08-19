import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {Icon} from '../../Icon'
import {IconButton} from '../../Icon-button'
import {
    RenderSideSheetContentLeadingOptions,
    RenderSideSheetContentTrailingOptions,
    SideSheetContentBaseProps
} from './Side-sheet-content.interface'
import {useSideSheetContentAnimated} from './use-side-sheet-content-animated.hook'

const renderSideSheetContentLeading =
    ({headlineLeading, back}: RenderSideSheetContentLeadingOptions) =>
    (onClose?: () => void) =>
        headlineLeading ??
        (back ?
            <IconButton
                icon={
                    <Icon
                        iconStyle='outlined'
                        name='arrowBack'
                        type='filled'
                    />
                }
                onPressOut={onClose}
                type='standard'
            />
        :   undefined)

const renderSideSheetContentTrailing =
    ({headlineTrailing, close}: RenderSideSheetContentTrailingOptions) =>
    (onClose?: () => void) =>
        headlineTrailing ??
        (close ?
            <IconButton
                icon={
                    <Icon
                        iconStyle='outlined'
                        name='close'
                        type='filled'
                    />
                }
                onPressOut={onClose}
                type='standard'
            />
        :   undefined)

export const SideSheetContentBase = forwardRef<View, SideSheetContentBaseProps>(
    (
        {
            back,
            close,
            densityScale,
            footerVisible,
            headlineText = 'Title',
            headlineLeading,
            onClose,
            render,
            sheetPosition = 'horizontalEnd',
            headlineTrailing,
            type,
            visible,
            ...renderProps
        },
        ref
    ) => {
        const id = useId()
        const {contentAnimatedStyle, containerAnimatedStyle, footerAnimatedStyle} = useSideSheetContentAnimated({
            densityScale,
            footerVisible,
            sheetPosition,
            type,
            visible
        })

        const leading = renderSideSheetContentLeading({headlineLeading, back})(onClose)
        const trailing = renderSideSheetContentTrailing({headlineTrailing, close})(onClose)

        return render({
            ...renderProps,
            containerAnimatedStyle,
            contentAnimatedStyle,
            densityScale,
            footerAnimatedStyle,
            headlineText,
            id,
            leading,
            ref,
            sheetPosition,
            trailing,
            type
        })
    }
)
