import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {DividerBase} from './Divider-base.component'
import {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

const render = ({subheader, style, layout, size: rawSize, ...containerProps}: RenderDividerProps) => {
        const size = subheader && layout === 'horizontal' ? 'small' : rawSize

        return (
                <Container
                        {...containerProps}
                        layout={layout}
                        size={size}
                >
                        <Content style={[style]} />

                        {subheader && (
                                <Subheader
                                        size='small'
                                        type='title'
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
