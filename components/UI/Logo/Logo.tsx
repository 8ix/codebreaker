import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const LogoStyle = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;

    h1{
        color: #fff;
        font-size: 2.9rem;
        font-family: "Archivo Black", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
`;

const StyledIcon = styled(Image)`
    padding:10px;
    background-color: #fff;
    border-radius: 50%;
    margin-right:10px;

    
`;

const Logo = () => {
    return (
        <LogoStyle>
            <StyledIcon src="/hacker.svg" alt="Hacker Icon" width={70} height={70} />
            <h1>CODEBREAKERS</h1>
        </LogoStyle>
    );
}

export default Logo;