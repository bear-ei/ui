import {Size, TypographyType} from '@bearei/material-token'
import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {Layout} from '../Common'
import {DividerBase} from './Divider-base.component'
import {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

const render = ({subheader, style, layout, size: rawSize, id, testID, ...containerProps}: RenderDividerProps) => {
        const size = subheader && layout === Layout.HORIZONTAL ? Size.SMALL : rawSize

        return (
                <Container
                        {...containerProps}
                        layout={layout}
                        size={size}
                        testID={testID ?? `divider--${id}`}
                >
                        <Content
                                style={[style]}
                                testID={testID ?? `divider__content--${id}`}
                        />

                        {subheader && (
                                <Subheader
                                        size={Size.SMALL}
                                        testID={testID ?? `divider__subheader--${id}`}
                                        type={TypographyType.TITLE}
                                >
                                        {subheader}
                                </Subheader>
                        )}
                </Container>
        )
}

const ForwardRefDivider = forwardRef<View, DividerProps>((props, ref) => (
        <DividerBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Divider: FC<DividerProps> = ForwardRefDivider
