import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ChipBase} from './Chip-base.component'
import {ChipProps, RenderChipProps} from './Chip.interface'
import {
        AvatarContainer,
        BackgroundUnderlay,
        Container,
        Content,
        FilterIcon,
        IconContainer,
        LabelText,
        Main,
        Trailing
} from './Chip.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        active,
        avatar,
        backgroundUnderlayAnimatedStyle,
        close,
        disabled,
        elevation,
        eventName,
        filterIconContainerAnimatedStyle,
        id,
        labelText,
        labelTextAnimatedStyle,
        leadingIcon,
        onStateEvent,
        ref,
        testID,
        theme,
        trailing,
        type = 'assist',
        ...contentProps
}: RenderChipProps) => {
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = theme.token.scheme.onSurfaceVariant
        const inputFilledShape = 'extraSmall'
        const commonShape = avatar ? 'full' : 'small'
        const shape = type === 'inputFilled' ? inputFilledShape : commonShape
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        shape={shape}
                        style={[backgroundUnderlayAnimatedStyle]}
                        testID={`chip__animatedBackgroundUnderlay--${id}`}
                />
        )

        const elevationUnderlayElement =
                elevation ?
                        <Elevation
                                level={elevation}
                                shape={shape}
                                testID={`chip__elevation--${id}`}
                        />
                :       undefined

        return (
                <Container
                        testID={testID ?? `chip--${id}`}
                        type={type}
                >
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                elevationUnderlay={elevationUnderlayElement}
                                ref={ref}
                                shape={shape}
                                testID={`chip__touchable--${id}`}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        {...contentProps}
                                        accessibilityLabel={labelText}
                                        accessibilityRole='button'
                                        shape={shape}
                                        testID={`chip__content--${id}`}
                                        type={type}
                                >
                                        <Main
                                                avatarShow={!!avatar}
                                                leadingIconShow={!!leadingIcon}
                                                testID={`chip__main--${id}`}
                                                trailingIconShow={!!trailing}
                                                type={type}
                                        >
                                                {leadingIcon &&
                                                        !avatar &&
                                                        (type === 'filter' ?
                                                                <AnimatedIconContainer
                                                                        style={[filterIconContainerAnimatedStyle]}
                                                                        testID={`chip__animatedIconContainer--${id}`}
                                                                >
                                                                        <FilterIcon testID={`chip__filterIcon--${id}`}>
                                                                                {leadingIcon}
                                                                        </FilterIcon>
                                                                </AnimatedIconContainer>
                                                        :       <IconContainer testID={`chip__iconContainer--${id}`}>
                                                                        {leadingIcon}
                                                                </IconContainer>)}

                                                {avatar && <AvatarContainer>{avatar}</AvatarContainer>}

                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size={type === 'inputFilled' ? 'small' : 'large'}
                                                        style={[labelTextAnimatedStyle]}
                                                        testID={`chip__animatedLabelText--${id}`}
                                                        type='label'
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>

                                                {trailing &&
                                                        (close ?
                                                                <Trailing
                                                                        testID={`chip__trailing--${id}`}
                                                                        type={type}
                                                                >
                                                                        {trailing}
                                                                </Trailing>
                                                        :       <IconContainer testID={`chip__iconContainer--${id}`}>
                                                                        {trailing}
                                                                </IconContainer>)}
                                        </Main>

                                        <Underlay
                                                active={active}
                                                activeAnimatedType='scaleX'
                                                activeColor={activeColor}
                                                eventName={eventName}
                                                shape={shape}
                                                testID={`chip__underlay--${id}`}
                                                underlayColor={underlayColor}
                                        />
                                </Content>
                        </Touchable>
                </Container>
        )
}

const ForwardRefChip = forwardRef<View, ChipProps>((props, ref) => (
        <ChipBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Chip: FC<ChipProps> = ForwardRefChip
