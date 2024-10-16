import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {SideSheetBase} from './Side-sheet-base.component'
import {SideSheetContent} from './Side-sheet-content'
import {RenderSideSheetProps, SideSheetProps} from './Side-sheet.interface'
import {Container} from './Side-sheet.styles'

const render = ({id, visible, type = 'standard', ...sheetProps}: RenderSideSheetProps) => {
    const sheetContentElement = typeof visible === 'boolean' && (
        <SideSheetContent
            {...sheetProps}
            visible={visible}
            type={type}
        />
    )

    return (
        <>
            {['standard', 'standardContainer'].includes(type) ?
                sheetContentElement
            :   <Container testID={`sideSheet--${id}`}>{sheetContentElement}</Container>}
        </>
    )
}

const ForwardRefSideSheet = forwardRef<View, SideSheetProps>((props, ref) => (
    <SideSheetBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const SideSheet: FC<SideSheetProps> = ForwardRefSideSheet
