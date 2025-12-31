import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 120px;
    flex-grow: 1;
    width: 100%;
    align-items: flex-start;
    gap: 60px;
`

const Title = styled.div`
    color: black;
    font-weight: 600;
    font-size: 36px;`



export default function My() {

    return (
        <Container>
            <Title>
                마이페이지
            </Title>
        </Container>
    );
}