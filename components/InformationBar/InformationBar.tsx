import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled, {keyframes} from 'styled-components';
import { GameContext } from '../../context/GameContext';

import PasswordsCracked from '../UI/PasswordsCracked/PasswordsCracked';
import RoundsLeft from '../UI/RoundsLeft/RoundsLeft';

const InfoBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const InformationBar = () => {
    const { gameEngine, isLoading, gameVersion } = useContext(GameContext);
    const [statusBar, setStatusBar] = useState<ReactElement[]>([]);

    useEffect(() => {
        if (gameEngine) {

            const game = gameEngine.getGameStatus();
            let status = [];

            status.push(<RoundsLeft key="rounds-left" qty={game.roundsLeft} />);
            status.push(<PasswordsCracked key="passwords-cracked" qty={game.currentStage} />);

            setStatusBar(status);
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <InfoBarContainer>
            {statusBar}
        </InfoBarContainer>    
    );
}

export default InformationBar;