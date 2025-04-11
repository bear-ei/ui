import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {SheetPosition} from '../Side-sheet.enum'
import {renderSideSheetContentLeading, renderSideSheetContentTrailing} from './Side-sheet-content-handle'
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
                        sheetPosition = SheetPosition.HORIZONTAL_END,
                        type,
                        visible,
                        ...renderProps
                },
                ref
        ) => {
                const {containerAnimatedStyle} = useSideSheetContentAnimated({type, visible})
                const id = useId()
                const theme = useTheme()
                const leadingElement = renderSideSheetContentLeading({headlineLeading, back, sheetPosition, id})(onBack)
                const trailingElement = renderSideSheetContentTrailing({headlineTrailing, close, id})(onClose)

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        footerVisible,
                        headlineText,
                        id,
                        leading: leadingElement,
                        ref,
                        sheetPosition,
                        theme,
                        trailing: trailingElement,
                        type
                })
        }
)
