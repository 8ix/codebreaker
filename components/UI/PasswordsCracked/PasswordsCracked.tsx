import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

type BarProps = {
    qty: number;
}

const BarContainer = styled.div`
    display:flex;
    flex-direction:row;
    line-height: 35px;
    padding: 20px;
    p{
        padding-left: 10px;
        font-weight: bold;
        font-size: 1.2rem;
    }

    @media (max-width: 500px) {
        p{
            font-size: 1rem;
            line-height: 25px;
        }
        .passwordIcon{
            width: 20px;
            height: 20px;
        }
    }
`;

const StyledIcon = styled(Image)`
    line-height: 20px;
`;

const PasswordsCracked = (props:BarProps) => {
    return (
        <BarContainer>
            <StyledIcon className="passwordIcon" src={"/password.svg"} alt="Password Icon" width={30} height={30} />
            <p>Solved : {props.qty}</p>
        </BarContainer>
    );
}

export default PasswordsCracked;