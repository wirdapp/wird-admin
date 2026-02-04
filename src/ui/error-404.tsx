import React from 'react';
import { css, cx } from '@emotion/css';
import { Flex } from 'antd';
import { ReactComponent as WirdLogo } from 'assets/icons/Shared/wirdLogo.svg';

export const Error404 = () => {
  return (
    <Flex
      align="center"
      justify="center"
      vertical
      gap={16}
      className={css`
        min-height: 500px;
        height: 100vh;
      `}
    >
      <div
        className={cx(
          'error-page',
          css`
            padding: 64px;
            border-radius: 16px;
            box-shadow: 0 0 16px rgba(100, 100, 100, 0.1);
          `,
        )}
      >
        <WirdLogo />
        <hr />
        <h2>404 Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/dashboard">Go to Home</a>
      </div>
    </Flex>
  );
};
