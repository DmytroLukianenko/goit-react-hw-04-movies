import React from 'react';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

export const Loader = () => {
    return (
        <RingLoader
            css={css`
        margin-top: 80px;
      `}
            size={150}
            color={'#4A90E2'}
            loading={true}
        />
    );
}

