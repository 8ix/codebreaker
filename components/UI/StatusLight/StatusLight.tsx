import React from 'react';
import styled from 'styled-components';

interface LightProps {
    type: 'perfect' | 'correct' | 'incorrect';
}

type StatusLightProps = {
    type: LightProps['type'];
    count: number;
}

const Lightbar = styled.div`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;
`;

const Light = styled.div<{ type: LightProps['type'] }>`
    flex-direction: row;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 5px;
    background-color: ${props => 
        props.type === 'perfect' ? 'green' : 
        props.type === 'correct' ? 'yellow' : 'red'
    };
    border-radius: 100%;
`;


const StatusLight = (props: StatusLightProps) => {

    let lights = [];
    
    for (let i = 0; i < props.count; i++) {
        lights.push(
            <Light key={'light-'+i+props.type} type={props.type} />
        );
    }

    return (
        <Lightbar>
            {lights}
        </Lightbar>
    );
}

export default StatusLight;