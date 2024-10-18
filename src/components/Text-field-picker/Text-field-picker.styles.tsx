import styled from 'styled-components/native'
import {Shape} from '../Common'

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const ListContainer = styled(Shape)`
    flex: 1;
    overflow: hidden;
`

export const Item = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 32px;
    justify-content: center;
`
