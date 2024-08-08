import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(-50px);
    }
    to {
        transform: translateY(0);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-50px);
    }
`;

const ModalOverlay = styled.div<{ isClosing: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease-out;
`;


const ModalContent = styled.div<{ isClosing: boolean }>`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    text-align: center;
    animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s ease-out;
`;

const CloseButton = styled.button`
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
`;

const Modal = ({ show, onClose, children }: { show: boolean, onClose: () => void, children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(show);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setIsClosing(false);
        } else {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300); // Duration of the closing animation
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible) {
        return null;
    }

    return (
        <ModalOverlay isClosing={isClosing}>
            <ModalContent isClosing={isClosing}>
                {children}
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;