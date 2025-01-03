import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'

import {Progress} from '../Progress'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base.component'
import {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {Container, Content, ContentItem, ContentUnderlay, Main} from './Icon-button.styles'

const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const render = ({
        active,
        contentUnderlayAnimatedStyle,
        defaultActive,
        disabled,
        eventName,
        height,
        icon,
        id,
        loading,
        onStateEvent,
        ref,
        testID,
        theme,
        type,
        underlayColor,
        width,
        ...contentProps
}: RenderIconButtonProps) => {
        const shape = 'full'
        const activeColor = theme.token.scheme.secondaryContainer
        const backgroundUnderlayElement = (
                <AnimatedContentUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[contentUnderlayAnimatedStyle]}
                        testID={`iconButton__contentUnderlay--${id}`}
                />
        )

        return (
                <Container
                        pointerEvents={loading ? 'none' : 'auto'}
                        testID={testID ?? `iconButton--${id}`}
                >
                        <ContentItem
                                lazy={true}
                                testID={`iconButton__contentItem--${id}`}
                                visible={loading}
                        >
                                <Progress
                                        animatedType='indeterminate'
                                        content={icon}
                                        height={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
                                        testID={`iconButton__progress--${id}`}
                                        type='circular'
                                        width={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
                                />
                        </ContentItem>

                        <ContentItem
                                testID={`iconButton__contentItem--${id}`}
                                visible={!loading}
                        >
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
                                                testID={`iconButton__content--${id}`}
                                                width={width}
                                        >
                                                <Main testID={`iconButton__main--${id}`}>{icon}</Main>
                                                <Underlay
                                                        active={active}
                                                        activeAnimatedType='scale'
                                                        activeColor={activeColor}
                                                        defaultActive={defaultActive}
                                                        eventName={eventName}
                                                        shape='full'
                                                        testID={`iconButton__underlay--${id}`}
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
