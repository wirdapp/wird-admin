import styled from "@emotion/styled";

export const StyledMembersResultsWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  height: 100%;

  .side-filters {
    width: 100%;

    .ant-form {
      max-width: 350px;
    }
  }

  .main-content {
    overflow: hidden;
    position: relative;
    min-height: 500px;
    background: rgba(150, 150, 150, 0.05);
    padding: 32px 16px 24px;
    margin: 0 -14px;
    border: 1px solid #fff;
    flex: 1;

    @media (min-width: 768px) {
      border-radius: 16px;
      padding: 32px 24px 24px;
      margin: 0;
    }

    .ant-empty {
      margin-top: 100px;
    }

    .spinner-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 250px;
    }
  }
`;
