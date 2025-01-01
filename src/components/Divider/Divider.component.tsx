import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {DividerBase} from './Divider-base.component'
import {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.styles'

const render = ({id, subheader, style, testID, layout, size: rawSize, ...containerProps}: RenderDividerProps) => {
        const size = subheader && layout === 'horizontal' ? 'small' : rawSize

        return (
                <Container
                        {...containerProps}
                        layout={layout}
                        size={size}
                        testID={testID ?? `divider--${id}`}
                >
                        <Content
                                style={[style]}
                                testID={`divider__content--${id}`}
                        />

                        {subheader && (
                                <Subheader
                                        size='small'
                                        testID={`divider__subheader--${id}`}
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
