import React, { useState, useEffect } from 'react';

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
    }, 40); // Adjust the speed of the gauge filling up.

    return () => clearInterval(interval);
  }, []);

  const getGradient = (value: number): string => {
    if (value < 20) return 'from-red-500 to-red-700';
    if (value < 40) return 'from-orange-500 to-orange-700';
    if (value < 60) return 'from-yellow-500 to-yellow-700';
    if (value < 80) return 'from-green-400 to-green-500';
    return 'from-green-500 to-green-700';
  };

  return (
    <div className="relative w-full h-16 bg-gray-200 rounded-full overflow-hidden shadow-md">
      <div
        className={`h-full rounded-full transition-all ease-in-out duration-40 ${getGradient(gaugeValue)} bg-gradient-to-r`}
        style={{ width: `${gaugeValue}%` }}
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="text-black font-medium">{`${gaugeValue}%`}</span>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 h-full w-full rounded-full border-8 border-white border-opacity-25"></div>
    </div>
  );
};

export default Gauge;
