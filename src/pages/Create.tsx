import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_ORITTEUL_API_URL + "/create-post";
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


export default function Create() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!title || !description) return alert("제목과 내용을 입력하세요!");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": API_KEY
                },
                body: JSON.stringify({ title, description }),
            });

            // const result = await response.json();
            // console.log("서버 응답:", result); // 여기서 "Saved!"가 찍히는지 확인

            if (response.ok) {
                alert("업로드 완료");
                // window.location.href = "/"; // 리다이렉트 예시
                navigate("/feed");
            }
        } catch (error) {
            console.error("에러:", error);
        }
    };

    return (
        <Container>
            <Title>
                작품 업로드
            </Title>
            <input placeholder={"제목을 입력하세요."} value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder={"내용을 입력하세요."} value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSubmit}>업로드</button>
        </Container>
    );
}