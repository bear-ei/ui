import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import {AvatarProps, RenderAvatarProps} from './Avatar.interface'
import {Container, Image, LabelText} from './Avatar.styles'

const render = ({
        backgroundColor,
        defaultSource,
        id,
        labelText,
        shape = 'full',
        size,
        source,
        testID,
        ...containerProps
}: RenderAvatarProps) => (
        <Container
                {...containerProps}
                accessibilityRole='image'
                backgroundColor={backgroundColor}
                pointerEvents='none'
                shape={shape}
                size={size}
                testID={testID ?? `avatar--${id}`}
        >
                {source || defaultSource ?
                        <Image
                                defaultSource={defaultSource ?? {}}
                                resizeMode='cover'
                                source={source ?? {}}
                                testID={`avatar__image--${id}`}
                        />
                :       <LabelText
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                size='medium'
                                testID={`avatar__labelText--${id}`}
                                type='title'
                        >
                                {labelText}
                        </LabelText>
                }
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
