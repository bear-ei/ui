import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Loading} from '../Loading'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base.component'
import {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {Container, Content, ContentItem, ContentUnderlay, Main} from './Icon-button.styles'

const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const render = ({
        active,
        activeColor,
        contentUnderlayAnimatedStyle,
        defaultActive,
        disabled,
        disabledFocus,
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
        const backgroundUnderlayElement = (
                <AnimatedContentUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[contentUnderlayAnimatedStyle]}
                        testID={`button__contentUnderlay--${id}`}
                />
        )

        return (
                <Container
                        disabled={disabled}
                        pointerEvents={loading ? 'none' : 'auto'}
                        testID={testID ?? `iconButton--${id}`}
                >
                        <ContentItem
                                lazy={true}
                                testID={`iconButton__contentItem--${id}`}
                                visible={loading}
                        >
                                <Loading
                                        content={icon}
                                        height={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
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
                                        disabled={loading || disabled}
                                        disabledFocus={disabledFocus}
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
