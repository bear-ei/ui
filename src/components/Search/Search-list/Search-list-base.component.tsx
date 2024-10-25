import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {emitter} from '../../../contexts'
import {ListData, RenderListProps, VirtualListComponent} from '../../List'
import {SearchListBaseProps} from './Search-list.interface'
import {useSearchListAnimated} from './use-search-list-animated.hook'

const handleSearchListEmit =
    (id: string) => (_render: () => JSX.Element) => (visible?: boolean) => {
        if (typeof visible === 'boolean') {
            emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})
        }
    }

const handleSearchListUnmount = (id: string) =>
    emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})

/**
 * TODO:
 */
export const SearchListBase = forwardRef<
    VirtualListComponent<ListData>,
    SearchListBaseProps
>(({containerLayout, render, visible, ...renderProps}, ref) => {
    const id = useId()
    const {containerAnimatedStyle} = useSearchListAnimated({
        visible,
        containerLayout
    })

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
        () => handleSearchListEmit(id)(renderSearchListRender),
        [id, renderSearchListRender]
    )

    useEffect(() => {
        onSearchListEmit(visible)
    }, [onSearchListEmit, visible])

    useEffect(() => () => handleSearchListUnmount(id), [id])

    return <></>
})
