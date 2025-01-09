import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import {AvatarProps, RenderAvatarProps} from './Avatar.interface'
import {Container, Content, Image, LabelText} from './Avatar.styles'

const render = ({
        backgroundColor,
        defaultSource,
        labelText,
        shape = 'full',
        source,
        ...containerProps
}: RenderAvatarProps) => (
        <Container
                {...containerProps}
                shape={shape}
        >
                <Content
                        accessibilityRole='image'
                        backgroundColor={backgroundColor}
                        pointerEvents='none'
                >
                        {source || defaultSource ?
                                <Image
                                        defaultSource={defaultSource ?? {}}
                                        resizeMode='cover'
                                        source={source ?? {}}
                                />
                        :       <LabelText
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        size='medium'
                                        type='title'
                                >
                                        {labelText}
                                </LabelText>
                        }
                </Content>
        </Container>
)

const ForwardRefAvatar = forwardRef<View, AvatarProps>((props, ref) => (
        <AvatarBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Avatar: FC<AvatarProps> = ForwardRefAvatar
