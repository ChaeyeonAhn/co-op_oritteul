import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

const API_URL = import.meta.env.VITE_ORITTEUL_API_URL + "/create-post";
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

const Title = styled.div`
    color: black;
    font-weight: 600;
    font-size: 36px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
`

const InputLabel = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: black;
    width: fit-content;
    padding: 0 2px 0 0;
    box-sizing: border-box;
    border-bottom: 2px solid black;
`

const TitleInput = styled.input`
    width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #888888;
`

const DescriptionInput = styled.textarea`
    width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    min-height: 200px;
    resize: vertical;
    border-radius: 8px;
    border: 1px solid #888888;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`

const Button = styled.button`
    padding: 12px 20px;
    border-radius: 8px;
    background-color: #b3bdcd;

    &:hover {
        font-weight: 600;
        background-color: #2e5073;
        color: #b3bdcd;
        transition: 0.2s;
    }
`


export default function Create() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const auth = useAuth();
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            const isTooLarge = selectedFiles.some(f => f.size > 100 * 1024 * 1024);
            if (isTooLarge) return alert("100MB를 초과하는 파일이 포함되어 있습니다.");

            setFiles(selectedFiles);
        }
    };


    const handleSubmit = async () => {
        if (!title || !description) return alert("제목과 내용을 입력하세요!");

        try {
            if (auth.isAuthenticated && auth.user?.id_token) {

                if (files.length > 0) {

                    const uploadedUrls = await Promise.all(files.map(async (file) => {
                        const token = auth.user?.id_token;

                        if (!token) {
                            alert("로그인 세션이 만료되었습니다.");
                            return;
                        }

                        const presignedRes = await fetch(`${import.meta.env.VITE_ORITTEUL_API_URL}/get-presigned-url`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token
                            },
                            body: JSON.stringify({ fileName: file.name, fileType: file.type }),
                        });
                        const { uploadUrl, fileKey } = await presignedRes.json();

                        await fetch(uploadUrl, {
                            method: "PUT",
                            headers: { "Content-Type": file.type },
                            body: file,
                        });

                        return `https://oritteul-media-storage.s3.us-east-1.amazonaws.com/${fileKey}`;
                    }));

                    const finalRes = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                            "Authorization": auth.user?.id_token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title,
                            description,
                            fileUrls: uploadedUrls
                        }),
                    });

                    if (finalRes.ok) {
                        alert("포스트와 미디어가 모두 업로드되었습니다!");
                        navigate("/feed");
                    }
                }

            else {
                    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                            "Authorization": auth.user.id_token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ title, description }),
                    });

                    const result = await response.json();
                    console.log("서버 응답:", result);

                    if (response.ok) {
                        alert("업로드 완료");
                        navigate("/feed");
                    }
                }

        }}
        catch (error) {
            console.error("에러:", error);
        }
    };

    if (!auth.isAuthenticated) {
        return (
            <Container>
                <Title>로그인이 필요한 페이지입니다.</Title>
            </Container>
        );
    }

    return (
        <Container>
            <Title>
                작품 업로드
            </Title>
            <input
                type="file"
                onChange={handleFileChange}
                multiple
            />
            <InputWrapper>
                <InputLabel>제목</InputLabel>
                <TitleInput
                    placeholder={"제목을 입력하세요."}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </InputWrapper>
            <InputWrapper>
                <InputLabel>설명</InputLabel>
                <DescriptionInput
                    placeholder={"내용을 입력하세요."}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </InputWrapper>
            <ButtonWrapper>
                <Button onClick={handleSubmit}>업로드</Button>
            </ButtonWrapper>
        </Container>
    );
}