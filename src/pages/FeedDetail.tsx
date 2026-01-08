import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FeedItem } from "../types/FeedItem.ts";
import { useAuth } from "react-oidc-context";

const API_URL = import.meta.env.VITE_ORITTEUL_API_URL + "/get-post";
// const API_KEY = import.meta.env.VITE_API_KEY;

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

const ImagePreview = styled.img`
    width: 100%;
    object-fit: fill;
    border-radius: 8px;
    margin-bottom: 8px;
    background-color: #f0f0f0;
`;

const VideoPreview = styled.video`
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
    display: block;
`

const AudioPreview = styled.audio`
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
    display: block;
`

const getMedia = (url: string) => {
    if (!url) return null;
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) return <ImagePreview src={url} alt="첨부 이미지" />;
    if (url.match(/\.(mp4|webm|ogg|mov)$/i))
        return <VideoPreview
        src={url}
        controls={false}
        muted
        onMouseOver={(e) => e.currentTarget.play()}
        onMouseOut={(e) => e.currentTarget.pause()}
    />
    if (url.match(/\.(mp3|wav|ogg|aac)$/i)) return <AudioPreview src={url} controls />;
    return null;
}


export default function FeedDetail() {
    const auth = useAuth();
    const { id } = useParams();
    const [item, setItem] = useState<FeedItem | null>(null);


    useEffect(() => {
        if (auth.isAuthenticated && auth.user?.id_token) {
        fetch(API_URL, {
            headers: {
                "Authorization": auth.user.id_token,
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data: FeedItem[]) => {
                const target = data.find((item) => item.id.toString() === id);
                if (target) {
                    setItem(target);
                }
            })
            .catch(err => console.error("데이터 로딩 실패:", err));;
    }}, [id]);

    if (!auth.isAuthenticated) {
        return (
            <Container>
                <Title>로그인이 필요한 페이지입니다.</Title>
            </Container>
        );
    }

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
            {item.fileUrls && item.fileUrls.map(fileUrl => (
                getMedia(fileUrl)
            ))}
            {item.description}
        </Container>
    );
}