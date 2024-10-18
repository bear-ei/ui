import {Meta, StoryObj} from '@storybook/react'
import {useMemo, useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Icon} from '../Icon'
import {Skeleton} from '../Skeleton'
import {Menu} from './Menu.component'
import {MenuProps} from './Menu.interface'

const renderMenuSkeleton = () => {
    const {Square, Rectangular, Circle} = Skeleton
    const containerStyle = {
        flex: 1,
        gap: 12,
        paddingLeft: 16,
        paddingRight: 28
    } as StyleProp<ViewStyle>

    const rectangularStyle = {flex: 1} as StyleProp<ViewStyle>

    return (
        <Rectangular
            height={56}
            style={[containerStyle]}
        >
            <Square
                height={24}
                width={24}
            />

            <Rectangular
                height={48}
                style={[rectangularStyle]}
            />

            <Circle
                height={40}
                width={40}
            />
        </Rectangular>
    )
}

export const Headline: StoryObj<MenuProps> = {
    args: {
        activeKey: 'TitleA',
        defaultActiveKey: 'TitleB',
        data: [
            {
                headline: 'TitleA',
                indexKey: 'TitleA',
                leading: <Icon />,
                trailing: <Icon />
            },
            {
                headline: 'TitleB',
                indexKey: 'TitleB'
            },
            {
                headline: 'TitleC',
                indexKey: 'TitleC'
            },
            {
                headline: 'TitleD',
                indexKey: 'TitleD'
            }
        ]
    }
}

export const Select = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
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
    const skeleton = useMemo(() => renderMenuSkeleton(), [])

    return (
        <View style={[style]}>
            <Menu
                data={data}
                selectType='select'
                skeletonElement={skeleton}
                activeKey={activeKey}
                onActive={onActiveKey}
                afterAffordance={true}
                loading={true}
            />
        </View>
    )
}

export const Multiselect = () => {
    const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
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
    const skeleton = useMemo(() => renderMenuSkeleton(), [])

    return (
        <View style={[style]}>
            <Menu
                activeKeys={activeKeys}
                afterAffordance={true}
                data={data}
                onActives={onActiveKeys}
                skeletonElement={skeleton}
                selectType='multiselect'
            />
        </View>
    )
}

export default {
    title: 'components/Menu',
    component: Menu
} as Meta<typeof Menu>
