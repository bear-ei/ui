import {LayoutAnimated} from '@/components/Layout-animated'
import {useTheme} from '@/hooks'
import {platformValue, processIconSize} from '@/utils'
import {SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {TextStyle, type View} from 'react-native'
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
                        size = SIZE.MEDIUM,
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
                const iconSize = processIconSize(theme)(size)
                const checkIconElement = (
                        <MaterialIcons
                                color={color}
                                name='check'
                                style={{fontSize: platformValue(iconSize)} as TextStyle}
                                testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`}
                        />
                )

                const closeIconElement = (
                        <MaterialIcons
                                color={color}
                                name='close'
                                style={{fontSize: platformValue(iconSize)} as TextStyle}
                                testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`}
                        />
                )

                return (
                        <LayoutAnimated
                                {...containerProps}
                                {...interactionHandlers}
                                className={clsx('relative flex w-32 self-stretch', {
                                        ['bg-[--color-primary]']: isDangerVisible
                                })}
                                entry={{duration: 0}}
                                lazy={true}
                                ref={ref}
                                style={{flexDirection: 'row'}}
                                testID={testID ?? `listAfterAffordance--${id}`}
                                visible={visible}
                        >
                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: checkIconElement})}
                                        {...{labelText: 'Edit', ...primaryButtonProps}}
                                        backgroundVisible={!isDangerVisible}
                                        onPressOut={onConfirm}
                                        size={size}
                                        tabIndex={buttonTabIndex}
                                        testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
                                />

                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: closeIconElement})}
                                        {...{labelText: 'Del', ...secondaryButtonProps}}
                                        backgroundVisible={false}
                                        onPressOut={onCancel}
                                        size={size}
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
