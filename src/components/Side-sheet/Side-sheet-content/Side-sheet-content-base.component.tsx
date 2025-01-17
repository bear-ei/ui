import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {handleSideSheetContentLeading, handleSideSheetContentTrailing} from './Side-sheet-content-handle'
import {SideSheetContentBaseProps} from './Side-sheet-content.interface'
import {useSideSheetContentAnimated} from './use-side-sheet-content-animated.hook'

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
                const {containerAnimatedStyle} = useSideSheetContentAnimated({type, visible})
                const leading = handleSideSheetContentLeading({headlineLeading, back, sheetPosition, id})(onBack)
                const trailing = handleSideSheetContentTrailing({headlineTrailing, close, id})(onClose)

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        footerVisible,
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
