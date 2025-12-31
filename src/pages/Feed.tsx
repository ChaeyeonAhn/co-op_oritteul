import styled from 'styled-components';
import {useEffect, useState} from "react";
import FeedCard from "../components/FeedCard.tsx";

const API_URL = import.meta.env.VITE_ORITTEUL_API_URL + "/get-post";
const API_KEY = import.meta.env.VITE_API_KEY;

interface Item {
    id: string;
    title: string;
    description: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 120px;
    flex-grow: 1;
    width: 100%;
    align-items: flex-start;
    gap: 60px;
`

const Title = styled('div')`
    color: black;
    font-weight: 600;
    font-size: 36px;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
    box-sizing: border-box;
    
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    height: 245px;
    background-color: #e5e5e5;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;


export default function Feed() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch(API_URL, {
            headers: { "X-Api-Key": API_KEY } // 헤더에 열쇠 추가!
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    return (
        <Container>
            <Title>
                오리뜰 작품 피드
            </Title>
            <GridContainer>
                {items.map((item, index) => (
                    <FeedCard
                        key={index}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </GridContainer>

        </Container>
    );
}