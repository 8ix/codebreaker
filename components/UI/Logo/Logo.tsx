import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

type LogoProps = {
    inverted?: boolean;
}

const LogoStyle = styled.div<LogoProps>`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;

    h1{
        color: ${props => props.inverted ? '#000;' : '#fff;'}
        font-size: 2.9rem;
        font-family: "Archivo Black", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
`;

const StyledIcon = styled(Image)<LogoProps>`
    padding:10px;
    background-color: ${props => props.inverted ? '#000;' : '#fff;'}
    border-radius: 50%;
    margin-right:10px;    
`;

const Logo = (props: LogoProps) => {
    return (
        <LogoStyle {...props}>
            <StyledIcon {...props} src={props.inverted ? "/hacker-invert.svg" : "/hacker.svg"} alt="Hacker Icon" width={70} height={70} />
            <h1>CODEBREAKERS</h1>
        </LogoStyle>
    );
}

export default Logo;