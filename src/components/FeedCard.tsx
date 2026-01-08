import styled from "styled-components";
import { ArrowIcon } from "../icons/ArrowIcon.tsx";

interface FeedCardProps {
    title: string;
    description: string;
    fileUrls?: string[];
    onClick?: () => void;
}

// const getMediaType = (url: string) => {
//     if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) return 'image';
//     if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return 'video';
//     if (url.match(/\.(mp3|wav|ogg|aac)$/i)) return 'audio';
//     return 'unknown';
// };

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
    if (url.match(/\.(mp3|wav|aac)$/i)) return <AudioPreview src={url} controls />;
    return null;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px 44px;
    box-sizing: border-box;
    gap: 24px;
    width: 100%;
    height: fit-content;

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

const ImagePreview = styled.img`
    width: 100%;
    object-fit: cover;
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
`;

const AudioPreview = styled.audio`
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
    display: block;
`


export default function FeedCard({ title, description, fileUrls=[], onClick = () => {} }: FeedCardProps) {
    return (
        <Container onClick={onClick}>
            {getMedia(fileUrls[0])}
            <Title>{title}</Title>
            <Description>{description}</Description>

            <BottomContainer>
                <ArrowIcon size={24}/>
            </BottomContainer>
        </Container>
    );
}