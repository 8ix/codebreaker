import React from 'react';
import styled from 'styled-components';


const Wapper = styled.div<ContainerProps>`
    padding-top: ${props => props.paddingTop ? `${props.paddingTop}px` : '0'};
    max-width: 800px;
    margin: 0 auto;
`;

interface ContainerProps {
    children: React.ReactNode;
    paddingTop?: number;
}

const Container: React.FC<ContainerProps> = (props) => {
    return (
        <Wapper {...props}>
            {props.children}
        </Wapper> 
    );
}

export default Container;