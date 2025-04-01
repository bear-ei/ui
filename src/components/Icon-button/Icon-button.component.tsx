import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Progress} from '../Progress'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base.component'
import {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {BackgroundUnderlay, Container, Content, ContentItemLayout, Main} from './Icon-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        active,
        backgroundUnderlayAnimatedStyle,
        defaultActive,
        disabled,
        eventName,
        icon,
        id,
        loading,
        ref,
        size,
        stateOnEvent,
        testID,
        theme,
        type,
        underlayColor,
        ...contentProps
}: RenderIconButtonProps) => {
        const shape = 'full'
        const activeColor = theme.token.scheme.secondaryContainer
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                        testID={`iconButton__animatedBackgroundUnderlay--${id}`}
                />
        )

        return (
                <Container
                        pointerEvents={loading ? 'none' : 'auto'}
                        testID={testID ?? `iconButton--${id}`}
                >
                        <ContentItemLayout
                                lazy={true}
                                testID={`iconButton__contentItemLayoutAnimated--${id}`}
                                visible={loading}
                        >
                                <Progress
                                        animatedType='indeterminate'
                                        content={icon}
                                        size={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
                                        testID={`iconButton__progress--${id}`}
                                        type='circular'
                                />
                        </ContentItemLayout>

                        <ContentItemLayout
                                testID={`iconButton__contentItemLayoutAnimated--${id}`}
                                visible={!loading}
                        >
                                <Touchable
                                        {...stateOnEvent}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        disabled={disabled}
                                        enableTouchableRipple={type !== 'active'}
                                        mainAlignSelf='center'
                                        ref={ref}
                                        shape={shape}
                                        testID={`iconButton__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <Content
                                                {...contentProps}
                                                accessibilityRole='button'
                                                pointerEvents='none'
                                                shape={shape}
                                                size={size}
                                                testID={`iconButton__content--${id}`}
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
                        </ContentItemLayout>
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
