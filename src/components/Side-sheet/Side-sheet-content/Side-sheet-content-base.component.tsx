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
    ({
        headlineLeading,
        back,
        sheetPosition
    }: RenderSideSheetContentLeadingOptions) =>
    (onBack?: () => void) =>
        headlineLeading ??
        (back ?
            <IconButton
                icon={
                    <Icon
                        iconStyle='outlined'
                        name={
                            sheetPosition === 'horizontalStart' ? 'arrowForward'
                            :   'arrowBack'
                        }
                        type='filled'
                    />
                }
                onPressOut={onBack}
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
            footerVisible,
            headlineLeading,
            headlineText = 'Title',
            headlineTrailing,
            onBack,
            onClose,
            render,
            sheetPosition = 'horizontalEnd',
            type,
            visible,
            ...renderProps
        },
        ref
    ) => {
        const id = useId()
        const {
            contentAnimatedStyle,
            containerAnimatedStyle,
            footerAnimatedStyle
        } = useSideSheetContentAnimated({
            footerVisible,
            sheetPosition,
            type,
            visible
        })

        const leading = renderSideSheetContentLeading({
            headlineLeading,
            back,
            sheetPosition
        })(onBack)

        const trailing = renderSideSheetContentTrailing({
            headlineTrailing,
            close
        })(onClose)

        return render({
            ...renderProps,
            containerAnimatedStyle,
            contentAnimatedStyle,
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
