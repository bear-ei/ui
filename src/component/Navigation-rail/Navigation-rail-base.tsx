import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {FABProps} from '../FAB'
import {
    HandleNavigationRailActiveOptions,
    InitialNavigationRailState,
    NavigationBaseProps,
    NavigationRailData,
    RenderNavigationRailItemOptions
} from '././Navigation-rail.interface'
import {NavigationRailItem} from './Navigation-rail-item'

const createNextActiveCallback = (onActive?: (value?: string) => void) => (value?: string) => () => onActive?.(value)
const handleNavigationRailActive =
    ({onActive}: HandleNavigationRailActiveOptions = {}) =>
    (setState: Updater<InitialNavigationRailState>) =>
    (value?: string) =>
        value &&
        setState(draft => {
            const prevNavigationRailActiveKey = draft.navigationRailActiveKey

            draft.navigationRailActiveKey = value
            prevNavigationRailActiveKey !== draft.navigationRailActiveKey &&
                (draft.nextActiveCallback = createNextActiveCallback(onActive)(value))
        })

const renderNavigationRailItems =
    (renderNavigationRailItemOptions: RenderNavigationRailItemOptions) => (data?: NavigationRailData[]) =>
        data?.map(({indexKey, ...props}, index) => (
            <NavigationRailItem
                {...props}
                {...renderNavigationRailItemOptions}
                itemKey={indexKey ?? index.toString()}
                key={indexKey}
            />
        ))

const renderNavigationRailFAB = (fab?: React.JSX.Element) =>
    fab ? cloneElement<FABProps>(fab, {elevated: false, size: 'medium'}) : undefined

export const NavigationRailBase = forwardRef<View, NavigationBaseProps>(
    (
        {activeKey, data, defaultActiveKey, fab, onActive, render, type, destinationPosition = 'top', ...renderProps},
        ref
    ) => {
        const [{navigationRailActiveKey, nextActiveCallback}, setState] = useImmer<InitialNavigationRailState>({
            navigationRailActiveKey: undefined,
            nextActiveCallback: undefined
        })

        const id = useId()
        const onNavigationRailActive = handleNavigationRailActive({onActive, activeKey: navigationRailActiveKey})(
            setState
        )

        const onNavigationRailActiveSource = useMemo(() => handleNavigationRailActive()(setState), [setState])
        const navigationRailItemElements = renderNavigationRailItems({
            activeKey: navigationRailActiveKey,
            onActive: onNavigationRailActive,
            type
        })(data)

        const fabElement = renderNavigationRailFAB(fab)

        useEffect(() => {
            onNavigationRailActiveSource(activeKey ?? defaultActiveKey)
        }, [activeKey, defaultActiveKey, onNavigationRailActiveSource])

        useEffect(() => {
            nextActiveCallback?.()
        }, [nextActiveCallback])

        if (typeof defaultActiveKey === 'string' && !navigationRailActiveKey) {
            return <></>
        }

        return render({
            ...renderProps,
            destinationPosition,
            fabElement,
            id,
            navigationRailItemElements,
            ref
        })
    }
)
