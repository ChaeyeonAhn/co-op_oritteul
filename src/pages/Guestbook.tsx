import { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_URL = import.meta.env.VITE_GUESTBOOK_API_URL + "/guest-create";
const API_KEY = import.meta.env.VITE_API_KEY;

interface Guest {
    id: string;
    name: string;
    message: string;
}

const TotalContainer = styled.div`
    padding: 20px;
`

const MessageInputContainer = styled.div`
    margin-bottom: 20px;
    border: 1px solid #ccc; 
    padding: 10px;
`

function Guestbook() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    // 1. 처음 로딩될 때 목록 가져오기 (GET)
    useEffect(() => {
        fetch(API_URL, {
            headers: { "X-Api-Key": API_KEY } // 헤더에 열쇠 추가!
        })
            .then((res) => res.json())
            .then((data) => setGuests(data));
    }, []);

    // 2. 글 쓰기 기능 (POST)
    const handleSubmit = async () => {
        if (!name || !message) return alert("이름과 내용을 입력하세요!");

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": API_KEY // 헤더에 열쇠 추가!
            },
            body: JSON.stringify({ name, message }),
        });

        // 목록 새로고침
        alert("등록되었습니다!");
        window.location.reload();
    };

    return (
        <TotalContainer>
            <h1>☁️ AWS Serverless 방명록</h1>

            <MessageInputContainer>
                <h3>글 남기기</h3>
                <input
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "5px" }}
                />
                <input
                    placeholder="메시지"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginRight: "5px" }}
                />
                <button onClick={handleSubmit}>등록</button>
            </MessageInputContainer>

            <h3>📝 방명록 목록</h3>
            <ul>
                {guests.map((guest) => (
                    <li key={guest.id}>
                        <strong>{guest.name}:</strong> {guest.message}
                    </li>
                ))}
            </ul>
        </TotalContainer>
    );
}

export default Guestbook;