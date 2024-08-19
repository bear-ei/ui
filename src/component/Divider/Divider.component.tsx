import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {DividerBase} from './Divider-base.component'
import {DividerProps, RenderDividerProps} from './Divider.interface'
import {Container, Content, Subheader} from './Divider.style'

const render = ({id, subheader, style, ...containerProps}: RenderDividerProps) => (
    <Container
        {...containerProps}
        testID={`divider--${id}`}
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

const ForwardRefDivider = forwardRef<View, DividerProps>((props, ref) => (
    <DividerBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Divider: FC<DividerProps> = ForwardRefDivider
