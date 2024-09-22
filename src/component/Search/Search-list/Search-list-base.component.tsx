import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {emitter} from '../../../context'
import {ListData, RenderListProps, VirtualListComponent} from '../../List'
import {SearchListBaseProps} from './Search-list.interface'
import {useSearchListAnimated} from './use-search-list-animated.hook'

const processSearchListEmit = (id: string) => (render: () => React.JSX.Element) => (visible?: boolean) =>
    typeof visible === 'boolean' && emitter.emit('modal', {id: `search__list--${id}`, render})

const processSearchListUnmount = (id: string) => emitter.emit('modal', {id: `search__list--${id}`, render: undefined})

export const SearchListBase = forwardRef<VirtualListComponent<ListData>, SearchListBaseProps>(
    ({containerLayout, render, visible, ...renderProps}, ref) => {
        const id = useId()
        const containerAnimatedStyle = useSearchListAnimated({visible, containerLayout})
        const renderSearchListRender = useCallback(
            () =>
                render({
                    ...renderProps,
                    containerAnimatedStyle,
                    id,
                    ref: ref as RenderListProps['ref'],
                    containerLayout
                }),
            [containerAnimatedStyle, containerLayout, id, ref, render, renderProps]
        )

        const onSearchListEmit = useMemo(
            () => processSearchListEmit(id)(renderSearchListRender),
            [id, renderSearchListRender]
        )

        useEffect(() => {
            onSearchListEmit(visible)
        }, [onSearchListEmit, visible])

        useEffect(() => () => processSearchListUnmount(id), [id])

        return <></>
    }
)
