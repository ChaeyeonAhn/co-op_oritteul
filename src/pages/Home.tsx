import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 200px;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    align-items: flex-start;
`

const TitleWrapper = styled('div')`
    display: flex;
    flex-direction: column;
`

const SubTitle = styled('div')`
    color: black;
    font-weight: 600;
    font-size: 28px;
`

const Title = styled('div')`
    color: black;
    font-weight: 700;
    font-size: 80px;
    letter-spacing: -0.07em;
`

export default function Home() {
    return (
        <Container>
            <Link to="/feed">
                <TitleWrapper>
                    <SubTitle>
                        카이스트인의 창작의 뜰
                    </SubTitle>
                    <Title>
                        오리뜰
                    </Title>
                </TitleWrapper>
            </Link>
        </Container>
    );
}