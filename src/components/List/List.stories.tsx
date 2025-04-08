import {ShapeType} from '@bearei/material-token'
import {Meta, StoryObj} from '@storybook/react'
import {useMemo, useState} from 'react'
import {View, ViewStyle} from 'react-native'
import {Icon, IconStyle} from '../Icon'
import {IconButton} from '../Icon-button'
import {Skeleton} from '../Skeleton'
import {List} from './List.component'
import {ListProps} from './List.interface'

const renderListSkeleton = () => {
        const {Square, Rectangular, Circle} = Skeleton
        const containerStyle = {
                paddingLeft: 16,
                flex: 1,
                gap: 16,
                paddingRight: 28
        } as ViewStyle

        const rectangularStyle = {flex: 1} as ViewStyle

        return (
                <Rectangular
                        size={56}
                        style={[containerStyle]}
                >
                        <Square size={24} />

                        <Rectangular
                                size={48}
                                style={[rectangularStyle]}
                        />

                        <Circle size={40} />
                </Rectangular>
        )
}

export const Headline: StoryObj<ListProps> = {
        args: {
                defaultActiveKey: 'TitleB',
                activeKey: 'TitleA',
                data: [
                        {
                                indexKey: 'TitleA',
                                headline: 'TitleA'
                        },
                        {
                                indexKey: 'TitleB',
                                headline: 'TitleB'
                        },
                        {
                                indexKey: 'TitleC',
                                headline: 'TitleC'
                        },
                        {
                                indexKey: 'TitleD',
                                headline: 'TitleD'
                        }
                ]
        }
}

export const Select = () => {
        const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
        const style = {height: 800, width: '100%'} as ViewStyle
        const data = useMemo(
                () =>
                        Array.from({length: 1255}, (_, index) => ({
                                indexKey: `Title${index + 1}`,
                                headline: `Title${index + 1}`,
                                leading: <Icon />,
                                extraData: []
                        })),
                []
        )

        const onActiveKey = (key?: string) => setActiveKey(key)
        // const skeleton = useMemo(() => renderListSkeleton(), [])

        return (
                <View style={[style]}>
                        <List
                                activeKey={activeKey}
                                afterAffordance={true}
                                data={data}
                                itemSize={56}
                                onActive={onActiveKey}
                                enableAutoSelect={true}
                                selectType='select'
                                shape='extraSmall'
                        />
                </View>
        )
}

export const Multiselect = () => {
        const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
        const style = {height: 800, width: '100%'} as ViewStyle
        const data = useMemo(
                () =>
                        Array.from({length: 1255}, (_, index) => ({
                                indexKey: `Title${index + 1}`,
                                headline: `Title${index + 1}`,
                                leading: <Icon />,
                                extraData: []
                        })),
                []
        )

        const onActiveKeys = (keys?: string[]) => setActiveKeys(keys)
        const skeleton = useMemo(() => renderListSkeleton(), [])

        return (
                <View style={[style]}>
                        <List
                                shape={ShapeType.FULL}
                                activeKeys={activeKeys}
                                afterAffordance={true}
                                data={data}
                                itemSize={56}
                                onActives={onActiveKeys}
                                selectType='select'
                                skeletonElement={skeleton}
                        />
                </View>
        )
}

export const Navigation = () => {
        const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
        const style = {height: 800, width: '100%'} as ViewStyle
        const data = useMemo(
                () =>
                        Array.from({length: 1255}, (_, index) => ({
                                indexKey: `Title${index + 1}`,
                                headline: `Title${index + 1}`,
                                leading: <Icon />,
                                trailing: (
                                        <IconButton
                                                size={24}
                                                icon={
                                                        <Icon
                                                                iconStyle={IconStyle.ROUNDED}
                                                                name='close'
                                                                type='filled'
                                                                size={18}
                                                        />
                                                }
                                                pointerEvents='box-only'
                                                type='standard'
                                        />
                                ),
                                extraData: []
                        })),
                []
        )

        const onActiveKeys = (keys?: string[]) => setActiveKeys(keys)

        return (
                <View style={[style]}>
                        <List
                                activeKeys={activeKeys}
                                data={data}
                                itemSize={48}
                                onActives={onActiveKeys}
                                selectType='select'
                        />
                </View>
        )
}

export default {
        title: 'components/List',
        component: List
} as Meta<typeof List>
