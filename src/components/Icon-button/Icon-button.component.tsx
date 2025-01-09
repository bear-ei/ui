import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'

import {Progress} from '../Progress'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base.component'
import {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {BackgroundUnderlay, Container, Content, ContentItem, Main} from './Icon-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        active,
        backgroundUnderlayAnimatedStyle,
        defaultActive,
        disabled,
        eventName,
        height,
        icon,
        loading,
        onStateEvent,
        ref,
        theme,
        type,
        underlayColor,
        width,
        ...contentProps
}: RenderIconButtonProps) => {
        const shape = 'full'
        const activeColor = theme.token.scheme.secondaryContainer
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                />
        )

        return (
                <Container pointerEvents={loading ? 'none' : 'auto'}>
                        <ContentItem
                                lazy={true}
                                visible={loading}
                        >
                                <Progress
                                        animatedType='indeterminate'
                                        content={icon}
                                        height={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
                                        type='circular'
                                        width={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
                                />
                        </ContentItem>

                        <ContentItem visible={!loading}>
                                <Touchable
                                        {...onStateEvent}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        disabled={disabled}
                                        enableTouchableRipple={type !== 'active'}
                                        mainAlignSelf='center'
                                        ref={ref}
                                        shape={shape}
                                        underlayColor={underlayColor}
                                >
                                        <Content
                                                {...contentProps}
                                                accessibilityRole='button'
                                                height={height}
                                                pointerEvents='none'
                                                shape={shape}
                                                width={width}
                                        >
                                                <Main>{icon}</Main>
                                                <Underlay
                                                        active={active}
                                                        activeAnimatedType='scale'
                                                        activeColor={activeColor}
                                                        defaultActive={defaultActive}
                                                        eventName={eventName}
                                                        shape='full'
                                                        underlayColor={underlayColor}
                                                />
                                        </Content>
                                </Touchable>
                        </ContentItem>
                </Container>
        )
}

const ForwardRefIconButton = forwardRef<View, IconButtonProps>((props, ref) => (
        <IconButtonBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const IconButton: FC<IconButtonProps> = ForwardRefIconButton
