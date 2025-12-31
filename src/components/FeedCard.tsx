import styled from "styled-components";

interface FeedCardProps {
    title: string;
    description: string;
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 245px;
    background-color: white;
    border-color: #213547;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;


export default function FeedCard({ title, description }: FeedCardProps) {
    return (
        <Container>
            {title}
            {description}
        </Container>
    );
}