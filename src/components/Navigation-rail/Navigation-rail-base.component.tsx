import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {FABProps} from '../FAB'
import {
    HandleNavigationRailActiveOptions,
    NavigationBaseProps,
    NavigationRailData,
    NavigationRailState,
    RenderNavigationRailItemOptions
} from '././Navigation-rail.interface'
import {NavigationRailItem} from './Navigation-rail-item'

const handleNavigationRailActive = ({
    onActive
}: HandleNavigationRailActiveOptions = {}) => {
    const createNextActiveEvent = (value?: string) => () => onActive?.(value)

    return (setState: Updater<NavigationRailState>) => (value?: string) => {
        if (value) {
            setState(draft => {
                const prevNavigationRailActiveKey =
                    draft.navigationRailActiveKey

                draft.navigationRailActiveKey = value

                if (
                    prevNavigationRailActiveKey !==
                    draft.navigationRailActiveKey
                ) {
                    draft.nextActiveEvent = createNextActiveEvent(value)
                }
            })
        }
    }
}

const renderNavigationRailItems =
    (renderNavigationRailItemOptions: RenderNavigationRailItemOptions) =>
    (data?: NavigationRailData[]) =>
        data?.map(({indexKey, ...props}, index) => (
            <NavigationRailItem
                {...props}
                {...renderNavigationRailItemOptions}
                itemKey={indexKey ?? index.toString()}
                key={indexKey}
            />
        ))

const renderNavigationRailFAB = (fab?: JSX.Element) =>
    fab ?
        cloneElement<FABProps>(fab, {elevated: false, size: 'medium'})
    :   undefined

export const NavigationRailBase = forwardRef<View, NavigationBaseProps>(
    (
        {
            activeKey,
            data,
            defaultActiveKey,
            fab,
            onActive,
            render,
            type,
            destinationPosition = 'top',
            ...renderProps
        },
        ref
    ) => {
        const [{navigationRailActiveKey, nextActiveEvent}, setState] =
            useImmer<NavigationRailState>({
                navigationRailActiveKey: undefined,
                nextActiveEvent: undefined
            })

        const id = useId()
        const onNavigationRailActive = handleNavigationRailActive({
            onActive,
            activeKey: navigationRailActiveKey
        })(setState)

        const onNavigationRailActiveSource = useMemo(
            () => handleNavigationRailActive()(setState),
            [setState]
        )

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
            nextActiveEvent?.()
        }, [nextActiveEvent])

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
