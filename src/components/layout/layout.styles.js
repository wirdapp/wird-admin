import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 8px;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    margin: 8px;
  }

  .page-content {
    padding: 24px 14px;
    background: #fff;
    border-radius: 1.5rem;
    flex: 1;
    @media (min-width: 768px) {
      padding: 24px;
    }
  }

  /* margin: 7rem 0 0 0; // will get back to 0 to change the width when needing to move elements to left */
`;

export const DashboardFooter = styled.footer`
  display: flex;
  justify-content: end;
  gap: 4px;
  font-size: 12px;
  padding-top: 8px;
  padding-bottom: 20px;
  color: #a7a7a7;
`;
