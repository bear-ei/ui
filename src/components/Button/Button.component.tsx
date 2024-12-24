import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ButtonBase} from './Button-base.component'
import {ButtonProps, RenderButtonProps} from './Button.interface'
import {ActiveIndicator, Container, Content, ContentUnderlay, IconContainer, LabelText, Main} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const render = ({
        contentUnderlayAnimatedStyle,
        disabled,
        elevation,
        eventName,
        icon,
        id,
        labelText,
        labelTextAnimatedStyle,
        loading,
        onStateEvent,
        ref,
        testID,
        type = 'filled',
        underlayColor,
        ...contentProps
}: RenderButtonProps) => {
        const link = type === 'link'
        const loadingEventName = link ? 'none' : 'longPress'
        const shape = link ? 'extraSmall' : 'full'
        const backgroundUnderlayElement = (
                <AnimatedContentUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[contentUnderlayAnimatedStyle]}
                        testID={`button__contentUnderlay--${id}`}
                />
        )

        const elevationUnderlayElement =
                typeof elevation === 'number' ?
                        <Elevation
                                level={elevation}
                                shape={shape}
                        />
                :       <></>

        const activeIndicatorVisible =
                type === 'link' &&
                eventName &&
                ['focus', 'hoverIn', 'longPress', 'press', 'pressIn', 'pressOut'].includes(eventName)

        return (
                <Container
                        testID={testID ?? `button--${id}`}
                        type={type}
                >
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={loading || disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                hotZone={type !== 'link'}
                                ref={ref}
                                shape={shape}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText}
                                        accessibilityRole='button'
                                        pointerEvents='none'
                                        shape={shape}
                                        testID={`button__content--${id}`}
                                        type={type}
                                >
                                        <Main
                                                iconShow={!!icon}
                                                testID={`button__main--${id}`}
                                                type={type}
                                        >
                                                {icon && !link && (
                                                        <IconContainer testID={`button__iconContainer--${id}`}>
                                                                {icon}
                                                        </IconContainer>
                                                )}

                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size={link ? 'small' : 'large'}
                                                        style={[labelTextAnimatedStyle]}
                                                        testID={`button__labelText--${id}`}
                                                        type={link ? 'body' : 'label'}
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>
                                        </Main>

                                        {type === 'link' && (
                                                <ActiveIndicator
                                                        testID={`button__activeIndicator--${id}`}
                                                        visible={activeIndicatorVisible}
                                                />
                                        )}

                                        <Underlay
                                                eventName={loading ? loadingEventName : eventName}
                                                shape={shape}
                                                underlayColor={underlayColor}
                                        />
                                </Content>
                        </Touchable>
                </Container>
        )
}

const ForwardRefButton = forwardRef<View, ButtonProps>((props, ref) => (
        <ButtonBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Button: FC<ButtonProps> = ForwardRefButton
