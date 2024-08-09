import React, { useContext, useEffect, useState, ReactElement } from 'react';
import styled, {keyframes} from 'styled-components';
import { GameContext } from '../../context/GameContext';

const ClueWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const CluesItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #f5f5f5;
  max-width: 500px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease-out, opacity 0.5s ease-out;
  margin: 0 auto;

  &.expanded {
    padding: 10px;
    max-height: 200px; // Adjust this value as needed
    opacity: 1;
    margin-top: 20px;

    @media (max-width: 500px) {
      margin-top: 0px;
    }
  }

  &:nth-child(n+2) {
    background-color: #ffd2e5;
    margin-top: 5px;
    font-size: 0.9rem;
    animation: ${bounceIn} 0.5s ease-out;
  }
`;

const Clues = () => {
    const { gameEngine, isLoading, gameVersion } = useContext(GameContext);
    const [clues, setClues] = useState<ReactElement[]>([]);


    useEffect(() => {
        if (gameEngine) {

            const game = gameEngine.getGameStatus();
            let hints = [];

            if(game.clues !== null && game.clues.passwordHint){
                hints.push(
                    <CluesItem key={game.clues.passwordHint} className="expanded">
                        <p>
                            <b>Password Hint:</b> {game.clues.passwordHint}
                        </p>
                    </CluesItem>
                );
            }

            if(game.roundsLeft <= 4){
                game.clues !== null && hints.push(
                    <CluesItem key={game.clues.passwordClue1} className="expanded">
                        <p>{game.clues.passwordClue1}</p>
                    </CluesItem>
                );
            }

            if(game.roundsLeft <= 3){
                game.clues !== null && hints.push(
                    <CluesItem key={game.clues.passwordClue2} className="expanded">
                        <p>{game.clues.passwordClue2}</p>
                    </CluesItem>
                );
            }

            if(game.roundsLeft <= 2){
                game.clues !== null && hints.push(
                    <CluesItem key={game.clues.passwordClue3} className="expanded">
                        <p>{game.clues.passwordClue3}</p>
                    </CluesItem>
                );
            }

            setClues(hints);
        }
    }, [gameEngine, gameVersion]);


    if (isLoading || !gameEngine) {
        return null;
    }

    return (
        <ClueWrapper>
           {clues}
        </ClueWrapper>    
    );
}

export default Clues;