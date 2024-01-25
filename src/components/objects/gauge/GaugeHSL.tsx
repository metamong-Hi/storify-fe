import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WaveGauge = styled.div<{ width: string; backgroundColor: string }>`
    height: 100%;
    border-radius: 9999px;
    background-size: 200% 100%;
    animation: wave 2s linear infinite;
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};

    @keyframes wave {
        0%,
        100% {
            background-position: 0 0;
        }
        50% {
            background-position: 100% 0;
        }
    }
`;

const Gauge: React.FC = () => {
    const [gaugeValue, setGaugeValue] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setGaugeValue((oldValue) => {
                const newValue = oldValue + 1;
                if (newValue >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newValue;
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    const getGradient = (value: number): string => {
        const hue = value * 1.2;
        return `hsl(${hue}, 90%, 60%)`;
    };

    return (
        <div className="relative w-full h-16 bg-gray-200 rounded-full overflow-hidden shadow-md">
            <WaveGauge width={`${gaugeValue}%`} backgroundColor={getGradient(gaugeValue)} />
            <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-black font-medium">{`${gaugeValue}%`}</span>
            </div>
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-8 border-white border-opacity-25"></div>
        </div>
    );
};

export default Gauge;
