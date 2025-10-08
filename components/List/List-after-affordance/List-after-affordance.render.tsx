import {LayoutAnimated} from '@/components/Layout-animated'
import {useTheme} from '@/hooks'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'

export const RenderListAfterAffordance = forwardRef<View, RenderListAfterAffordanceProps>(
        (
                {
                        dangerAnimatedStyle,
                        doubleConfirmed,
                        id,
                        interactionHandlers,
                        onCancel,
                        onConfirm,
                        primaryButtonProps,
                        secondaryButtonProps,
                        testID,
                        visible,
                        ...containerProps
                }: RenderListAfterAffordanceProps,
                ref
        ) => {
                const theme = useTheme()
                const buttonTabIndex = visible ? 0 : -1
                const color = theme.token.scheme.onPrimary
                const isDangerVisible = !secondaryButtonProps?.disabled
                const size = theme.token.spacing.large
                const checkIconElement = (
                        <MaterialCommunityIcons
                                color={color}
                                name='check'
                                size={size}
                                testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`}
                        />
                )

                const closeIconElement = (
                        <MaterialCommunityIcons
                                color={color}
                                name='close'
                                size={size}
                                testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`}
                        />
                )

                return (
                        <LayoutAnimated
                                {...containerProps}
                                {...interactionHandlers}
                                className={clsx('relative flex w-40 flex-row self-stretch', {
                                        ['bg-[--color-primary]']: !isDangerVisible
                                })}
                                entry={{duration: 0}}
                                lazy={true}
                                ref={ref}
                                testID={testID ?? `listAfterAffordance--${id}`}
                                visible={visible}
                        >
                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: checkIconElement})}
                                        {...{labelText: 'Confirm', ...primaryButtonProps}}
                                        backgroundVisible={!isDangerVisible}
                                        onPressOut={onConfirm}
                                        tabIndex={buttonTabIndex}
                                        testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
                                />

                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: closeIconElement})}
                                        {...{labelText: 'Cancel', ...secondaryButtonProps}}
                                        backgroundVisible={false}
                                        onPressOut={onCancel}
                                        tabIndex={buttonTabIndex}
                                        testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
                                />

                                <LayoutAnimated
                                        className='pointer-events-none absolute bottom-0 right-0 top-0 -z-10 w-1/2 bg-[--color-error]'
                                        style={[dangerAnimatedStyle]}
                                        testID={`listAfterAffordance__animatedDanger--${id}`}
                                        visible={isDangerVisible}
                                />
                        </LayoutAnimated>
                )
        }
)

RenderListAfterAffordance.displayName = 'RenderListAfterAffordance'
