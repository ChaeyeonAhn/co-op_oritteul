import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FeedItem } from "../types/FeedItem.ts";

const API_URL = import.meta.env.VITE_ORITTEUL_API_URL + "/get-post";
const API_KEY = import.meta.env.VITE_API_KEY;

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


export default function FeedDetail() {

    const { id } = useParams();
    const [item, setItem] = useState<FeedItem | null>(null);

    useEffect(() => {
        fetch(API_URL, {
            headers: { "X-Api-Key": API_KEY } // 헤더에 열쇠 추가!
        })
            .then((res) => res.json())
            .then((data: FeedItem[]) => {
                const target = data.find((item) => item.id.toString() === id);
                if (target) {
                    setItem(target);
                }
            })
            .catch(err => console.error("데이터 로딩 실패:", err));;
    }, [id]);

    if (!item) {
        return (
            <Container>
                <Title>Loading...</Title>
             </Container>
        )
    }

    return (
        <Container>
            <Title>
                {item.title}
            </Title>
            {item.description}
        </Container>
    );
}