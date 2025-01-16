import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Button} from '../../Button'
import {Divider} from '../../Divider'
import {SideSheetContentBase} from './Side-sheet-content-base.component'
import {RenderSideSheetContentProps, SideSheetContentProps} from './Side-sheet-content.interface'
import {
        Container,
        Content,
        Footer,
        FooterContainer,
        FooterLayoutAnimated,
        Header,
        HeaderText,
        HeadlineContainer,
        Leading,
        Main,
        PrimaryButton,
        SecondaryButton,
        Trailing
} from './Side-sheet-content.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)

/**
 * TODO: Add visible animation for modal layer types.
 */
const render = ({
        containerAnimatedStyle,
        content,
        footerVisible,
        headlineText,
        leading,
        onCancel,
        onConfirm,
        primaryButton,
        primaryButtonProps,
        secondaryButton,
        secondaryButtonProps,
        shape,
        sheetPosition,
        style,
        trailing,
        type,
        ...innerProps
}: RenderSideSheetContentProps) => {
        const sheetShape = shape ?? (sheetPosition === 'horizontalStart' ? 'largeEnd' : 'largeStart')

        return (
                <AnimatedContainer
                        sheetPosition={sheetPosition}
                        style={[containerAnimatedStyle]}
                        type={type}
                >
                        <Content
                                {...innerProps}
                                accessibilityRole='alert'
                                shape={sheetShape}
                                style={[style]}
                                type={type}
                        >
                                <Header
                                        leadingShow={!!leading}
                                        trailingShow={!!trailing}
                                >
                                        {leading && <Leading>{leading}</Leading>}
                                        <HeadlineContainer>
                                                <HeaderText
                                                        numberOfLines={1}
                                                        size='large'
                                                        type='title'
                                                >
                                                        {headlineText}
                                                </HeaderText>
                                        </HeadlineContainer>

                                        {trailing && <Trailing>{trailing}</Trailing>}
                                </Header>

                                <Main>{content}</Main>
                                <FooterLayoutAnimated
                                        animatedType='collapseY'
                                        entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                                        exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                                        visible={footerVisible}
                                >
                                        <FooterContainer>
                                                <Divider size='large' />
                                                <Footer type={type}>
                                                        <PrimaryButton>
                                                                {primaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Confirm',
                                                                                        ...primaryButtonProps
                                                                                }}
                                                                                onPressOut={onConfirm}
                                                                                type='filled'
                                                                        />
                                                                )}
                                                        </PrimaryButton>

                                                        <SecondaryButton>
                                                                {secondaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Cancel',
                                                                                        ...secondaryButtonProps
                                                                                }}
                                                                                onPressOut={onCancel}
                                                                                type='outlined'
                                                                        />
                                                                )}
                                                        </SecondaryButton>
                                                </Footer>
                                        </FooterContainer>
                                </FooterLayoutAnimated>
                        </Content>
                </AnimatedContainer>
        )
}

const ForwardRefSideSheetContent = forwardRef<View, SideSheetContentProps>((props, ref) => (
        <SideSheetContentBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const SideSheetContent: FC<SideSheetContentProps> = ForwardRefSideSheetContent
