import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const questions = [
  { cat: 'A. 정보의 오류', q: '지시를 받을 때 "왜 이 일을 하는지" 목적을 묻지 않고 일단 시작한다.' },
  { cat: 'A. 정보의 오류', q: '상사가 생각하는 최종 결과물의 이미지(포맷, 분량 등)를 확인하지 않는다.' },
  { cat: 'A. 정보의 오류', q: '업무 수행 중 궁금한 점이 생겨도 혼자 추측해서 해결하려 한다.' },
  { cat: 'A. 정보의 오류', q: '보고 대상자가 누구인지, 그들의 성향이 어떤지 고려하지 않는다.' },
  { cat: 'B. 선후 관계의 오류', q: '여러 업무가 겹치면 가장 빨리 끝낼 수 있는 것부터 손을 댄다.' },
  { cat: 'B. 선후 관계의 오류', q: '다른 사람의 협조가 필요한 일을 가장 나중으로 미룬다.' },
  { cat: 'B. 선후 관계의 오류', q: '업무 사이의 연관성(A가 끝나야 B를 할 수 있는 관계)을 무시한다.' },
  { cat: 'B. 선후 관계의 오류', q: '병목 공정(Bottle-neck)을 파악하지 못해 전체 일정이 지연된다.' },
  { cat: 'C. 시간 예측의 오류', q: 'To-do List 작성 시 업무별 소요 시간을 아예 적지 않는다.' },
  { cat: 'C. 시간 예측의 오류', q: '금방 끝날 거야라고 생각한 일이 예상보다 2배 이상 오래 걸린다.' },
  { cat: 'C. 시간 예측의 오류', q: '돌발 업무를 위한 버퍼 시간(Buffer Time)을 전혀 고려하지 않는다.' },
  { cat: 'C. 시간 예측의 오류', q: '마감 직전까지 미루다가 급하게 마무리하거나 밤을 새운다.' }
];

type Screen = 'start' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0 });

  const handleStart = () => {
    setScreen('quiz');
    setCurrentIdx(0);
    setScores({ A: 0, B: 0, C: 0 });
  };

  const handleAnswer = (val: number) => {
    const currentQuestion = questions[currentIdx];
    const catKey = currentQuestion.cat[0] as 'A' | 'B' | 'C';
    
    setScores(prev => ({
      ...prev,
      [catKey]: prev[catKey] + val
    }));

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setScreen('start');
    setCurrentIdx(0);
    setScores({ A: 0, B: 0, C: 0 });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 md:p-8 font-sans">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'quiz' && (
        <QuizScreen 
          question={questions[currentIdx]} 
          currentIdx={currentIdx} 
          totalQuestions={questions.length} 
          onAnswer={handleAnswer} 
        />
      )}
      {screen === 'result' && (
        <ResultScreen scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}
