import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from "react-oidc-context";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 200px;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    align-items: flex-start;

    &:hover {
        cursor: pointer;
    }
`

const TitleWrapper = styled('div')`
    display: flex;
    flex-direction: column;
`

const SubTitle = styled('div')`
    color: black;
    font-weight: 600;
    font-size: 28px;
    text-decoration: none;
`

const Title = styled('div')`
    color: black;
    font-weight: 700;
    font-size: 80px;
    letter-spacing: -0.07em;
    text-decoration: none;
`


export default function Home() {
    const auth = useAuth();
    const navigate = useNavigate();

    // const signOutRedirect = () => {
    //     const clientId = "5ehtjesqkcljohln93pc4kdtu5";
    //     const logoutUri = "http://localhost:5173";
    //     const cognitoDomain = "https://us-east-1dcun5l0pi.auth.us-east-1.amazoncognito.com";
    //     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    // };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    // if (auth.isAuthenticated) {
    //     return (
    //         <div>
    //             <pre> Hello: {auth.user?.profile.email} </pre>
    //             <pre> ID Token: {auth.user?.id_token} </pre>
    //             <pre> Access Token: {auth.user?.access_token} </pre>
    //             <pre> Refresh Token: {auth.user?.refresh_token} </pre>
    //
    //             <button onClick={() => auth.removeUser()}>Sign out</button>
    //         </div>
    //     );
    // }

    return (
        <Container onClick={() => navigate('/feed')}>
            <TitleWrapper>
                <SubTitle>
                    카이스트인의 창작의 뜰
                </SubTitle>
                <Title>
                    오리뜰
                </Title>
            </TitleWrapper>
        </Container>
    );
}