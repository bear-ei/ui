import {Link} from 'expo-router'
import {FC} from 'react'
import {Text, View} from 'react-native'

const Index: FC = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true' ?
                        <Link href='/(storybook)'>Open Storybook</Link>
                :       <Text>Hello World (storybook disabled)</Text>}
        </View>
)

export default Index
