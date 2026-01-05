import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_dCuN5l0PI",
    client_id: "5ehtjesqkcljohln93pc4kdtu5",
    redirect_uri: "http://localhost:5173",
    response_type: "code",
    scope: "email openid phone",
};

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

// wrap the application with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);