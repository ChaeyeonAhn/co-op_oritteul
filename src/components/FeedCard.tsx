import styled from "styled-components";
import { ArrowIcon } from "../icons/ArrowIcon.tsx";

interface FeedCardProps {
    title: string;
    description: string;
    onClick?: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px 44px;
    box-sizing: border-box;
    gap: 24px;
    width: 100%;
    height: 245px;

    background-color: white;
    color: #213547;
    

    border: 2px solid;
    border-color: rgba(46, 80, 115, 0.1);
    border-radius: 12px;
    align-items: flex-start;
    justify-content: flex-start;

    &:hover {
        background-color: #213547;
        color: white;
        transition: 0.2s;
    }
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    color: white;
`

const Title = styled.div`
    font-weight: 600;
    border-bottom: 2px solid;
    padding: 0 2px 0 0;
    box-sizing: border-box;
`

const Description = styled.div`
    font-weight: 500;
`


export default function FeedCard({ title, description, onClick = () => {} }: FeedCardProps) {
    return (
        <Container onClick={onClick}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <BottomContainer>
                <ArrowIcon size={24}/>
            </BottomContainer>
        </Container>
    );
}