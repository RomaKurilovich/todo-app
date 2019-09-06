import styled from 'styled-components'

let ButtonFilter = styled.div`

border: solid 1px black;
padding: 2px;
text-align: center;
background-color:  ${props => props.selected ? 'green' : 'grey'}
color:  ${props => props.selected ? 'white' : 'black'}
cursor: ${props => props.selected ? 'default' : 'pointer'}
width: 90px;

&:hover{
    background-color: ${props => props.selected ? 'green' : '#035603'}
}

`


export default ButtonFilter