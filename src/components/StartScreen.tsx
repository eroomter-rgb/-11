import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] p-8 text-center mt-10 max-w-2xl mx-auto">
      <div className="text-5xl mb-6">🧶</div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">업무 꼬임 자가진단</h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        최근 1주일간의 업무 상황을 회상하며<br />
        당신의 업무 실타래가 얼마나 꼬였는지 진단해보세요.
      </p>
      <button
        onClick={onStart}
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(59,130,246,0.4)]"
      >
        진단 시작하기
      </button>
    </div>
  );
}
