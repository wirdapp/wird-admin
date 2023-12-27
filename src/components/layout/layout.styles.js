import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 1600px;
    margin: auto;
    min-height: 100vh;
`;

export const MainContent = styled.main`
    flex-grow: 1;
    width: 100%;
    @media (min-width: 768px) {
        margin: 8px 24px;
    }

    .page-content {
        padding: 24px 16px;
    }

    /* margin: 7rem 0 0 0; // will get back to 0 to change the width when needing to move elements to left */
`;