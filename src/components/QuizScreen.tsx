import React from 'react';

interface Question {
  cat: string;
  q: string;
}

interface QuizScreenProps {
  question: Question;
  currentIdx: number;
  totalQuestions: number;
  onAnswer: (val: number) => void;
}

export default function QuizScreen({ question, currentIdx, totalQuestions, onAnswer }: QuizScreenProps) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
          {question.cat}
        </span>
        <span className="text-gray-400 text-sm font-bold">
          {currentIdx + 1} / {totalQuestions}
        </span>
      </div>
      <div className="text-xl font-semibold text-gray-800 mb-8 min-h-[4rem]">
        {question.q}
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => onAnswer(val)}
            className="w-full p-4 border-2 border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left font-medium text-gray-700"
          >
            {val}. {val === 1 ? '전혀 그렇지 않다' : val === 2 ? '그렇지 않다' : val === 3 ? '보통이다' : val === 4 ? '그렇다' : '매우 그렇다'}
          </button>
        ))}
      </div>
    </div>
  );
}
