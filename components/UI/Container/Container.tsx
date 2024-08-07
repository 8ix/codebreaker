import React from 'react';
import styled from 'styled-components';

const Wapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
    return (
        <Wapper>
            {props.children}
        </Wapper> 
    );
}

export default Container;