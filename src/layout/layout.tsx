import {Outlet, Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useAuth} from "react-oidc-context";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
`;

const Header = styled.div`
    padding: 10px 40px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box; // padding also included in width
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: 2px solid;
    border-color: rgba(33, 53, 71, 0.1);
`

const Navbar = styled.nav`
    display: flex;
    flex-direction: row;
    gap: 12px;
`;

// const Bolder = styled(Link)`
//     color: black;
//     font-weight: 600;
//     font-size: 16px;
//     &:hover {
//         color: black;
//         font-weight: 700;
//     }
// `

const BolderDiv = styled.div`
    color: black;
    font-weight: 600;
    font-size: 16px;
    &:hover {
        color: black;
        font-weight: 700;
        cursor: pointer;
    }
`

const Underline = styled(Link)`
    color: black;
    font-weight: 500;
    font-size: 16px;

    &:hover {
        font-weight: 600;
        color: #28445e;
        text-decoration: underline;
    }
`;

const MainContent = styled.main`
    max-width: 100vw;
    display: flex;
    flex-grow: 1;
`;

export default function Layout() {
    const auth = useAuth();
    const navigate = useNavigate();

    const signOutRedirect = () => {
        const clientId = "5ehtjesqkcljohln93pc4kdtu5";
        const logoutUri = "http://localhost:5173";
        const cognitoDomain = "https://us-east-1dcun5l0pi.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

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

    if (auth.isAuthenticated) {
        return (
            <LayoutWrapper>
                <Header>
                    <BolderDiv onClick={() => navigate('/')}>오리뜰</BolderDiv>
                    <Navbar>
                        <Underline to="/feed">피드</Underline>
                        <Underline to="/create">작품 업로드</Underline>
                        <Underline to="/community">커뮤니티</Underline>
                    </Navbar>
                    <Navbar>
                        <BolderDiv onClick={() => navigate('/my')}>마이페이지</BolderDiv>
                        <BolderDiv onClick={() => {
                            signOutRedirect();
                            auth.removeUser()}}>({auth.user?.profile.email}) 로그아웃</BolderDiv>
                    </Navbar>
                </Header>


                <MainContent>
                    <Outlet />
                </MainContent>
            </LayoutWrapper>
        )
    }

    return (
        <LayoutWrapper>
            <Header>
                <BolderDiv onClick={() => navigate('/')}>오리뜰</BolderDiv>
                <Navbar>
                    <Underline to="/feed">피드</Underline>
                    <Underline to="/create">작품 업로드</Underline>
                    <Underline to="/community">커뮤니티</Underline>
                </Navbar>
                <Navbar>
                    <BolderDiv onClick={() => navigate('/my')}>마이페이지</BolderDiv>
                    <BolderDiv onClick={() => auth.signinRedirect()}>로그인</BolderDiv>
                </Navbar>
            </Header>


            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutWrapper>
    );
}

