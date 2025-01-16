import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ButtonBase} from './Button-base.component'
import {ButtonProps, RenderButtonProps} from './Button.interface'
import {
        ActiveIndicator,
        ActiveIndicatorLayoutAnimated,
        BackgroundUnderlay,
        Container,
        Content,
        IconContainer,
        LabelText,
        Main
} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
        backgroundUnderlayAnimatedStyle,
        disabled,
        elevation,
        eventName,
        icon,
        labelText,
        labelTextAnimatedStyle,
        loading,
        onStateEvent,
        ref,
        type = 'filled',
        underlayColor,
        ...contentProps
}: RenderButtonProps) => {
        const activeIndicatorVisible =
                type === 'link' &&
                eventName &&
                ['focus', 'hoverIn', 'longPress', 'press', 'pressIn', 'pressOut'].includes(eventName)

        const link = type === 'link'
        const loadingEventName = link ? 'none' : 'longPress'
        const shape = link ? 'extraSmall' : 'full'
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                />
        )

        const elevationUnderlayElement =
                typeof elevation === 'number' ?
                        <Elevation
                                level={elevation}
                                shape={shape}
                        />
                :       <></>

        return (
                <Container type={type}>
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
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
                                        type={type}
                                >
                                        <Main
                                                iconShow={!!icon}
                                                type={type}
                                        >
                                                {icon && !link && <IconContainer>{icon}</IconContainer>}

                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size={link ? 'small' : 'large'}
                                                        style={[labelTextAnimatedStyle]}
                                                        type={link ? 'body' : 'label'}
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>
                                        </Main>

                                        {type === 'link' && (
                                                <ActiveIndicatorLayoutAnimated visible={activeIndicatorVisible}>
                                                        <ActiveIndicator />
                                                </ActiveIndicatorLayoutAnimated>
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
