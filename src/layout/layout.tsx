import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Bolder = styled(Link)`
    color: black;
    font-weight: 600;
    font-size: 16px;
    &:hover {
        color: black;
        font-weight: 700;
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
    return (
        <LayoutWrapper>
            <Header>
                <Bolder to="/">오리뜰</Bolder>
                <Navbar>
                    <Underline to="/feed">피드</Underline>
                    <Underline to="/create">작품 업로드</Underline>
                    <Underline to="/community">커뮤니티</Underline>
                </Navbar>
                <Navbar>
                    <Bolder to="/my">마이페이지</Bolder>
                    <Bolder to="/login">로그인</Bolder>
                    <Bolder to="/signup">회원가입</Bolder>
                </Navbar>
            </Header>


            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutWrapper>
    );
}

