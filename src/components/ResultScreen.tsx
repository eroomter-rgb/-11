import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ResultScreenProps {
  scores: { A: number; B: number; C: number };
  onRestart: () => void;
}

export default function ResultScreen({ scores, onRestart }: ResultScreenProps) {
  const total = scores.A + scores.B + scores.C;
  
  // Calculate Type first (Primary Result)
  const maxVal = Math.max(scores.A, scores.B, scores.C);
  let typeTitle = "";
  let typeColorClass = "";
  let analysisContent = "";

  if (scores.A === maxVal) {
    typeTitle = "맥락 결핍형 (정보의 오류)";
    typeColorClass = "bg-blue-500";
    analysisContent = "질문을 '실력 부족'으로 오해하여 혼자 추측하고 달리는 스타일입니다. 재작업 확률이 매우 높습니다. <br/><br/>💡 <b>처방:</b> 5W1H 질문법을 생활화하고 최종 목적을 반드시 확인하세요.";
  } else if (scores.B === maxVal) {
    typeTitle = "시야 협착형 (선후 관계의 오류)";
    typeColorClass = "bg-purple-500";
    analysisContent = "전체 흐름보다 눈앞의 쉬운 일에 먼저 손이 가는 스타일입니다. 나로 인해 팀 전체가 대기하는 병목을 유발합니다. <br/><br/>💡 <b>처방:</b> '타인의 협조가 필요한 일'을 무조건 오전 1순위로 배치하세요.";
  } else {
    typeTitle = "낙관적 망상형 (시간 예측의 오류)";
    typeColorClass = "bg-orange-500";
    analysisContent = "자신의 능력을 과대평가하고 마감을 즐기는 스타일입니다. 품질이 낮고 주변에 불안감을 줍니다. <br/><br/>💡 <b>처방:</b> 모든 소요 시간에 '곱하기 1.5배'를 적용하고 버퍼 시간을 확보하세요.";
  }

  // Severity (Secondary Result)
  let severityStatus = "";
  let severityDesc = "";

  if (total >= 45) {
    severityStatus = "🚨 위험 단계";
    severityDesc = "업무의 주도권을 완전히 상실했습니다. '열심히'는 하지만 늘 불안하고 성과는 낮습니다.";
  } else if (total >= 30) {
    severityStatus = "⚠️ 주의 단계";
    severityDesc = "특정 영역에서 병목이 발생하고 있습니다. 돌발 상황에 취약합니다.";
  } else {
    severityStatus = "✅ 양호 단계";
    severityDesc = "업무 맥락을 이해하고 스스로 통제하고 있습니다.";
  }

  const data = {
    labels: ['정보(A)', '선후관계(B)', '시간예측(C)'],
    datasets: [
      {
        label: '영역별 점수',
        data: [scores.A, scores.B, scores.C],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 20,
        ticks: { stepSize: 5 },
        pointLabels: {
          font: {
            family: "'Pretendard', sans-serif",
            size: 12
          }
        }
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] p-8 max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">진단 결과 리포트</h2>
      
      <div className="flex flex-col items-center mb-8">
        <div className="text-gray-500 text-sm mb-2">당신의 업무 꼬임 유형은</div>
        <div className={`px-8 py-3 rounded-full text-white font-bold text-xl mb-6 shadow-lg ${typeColorClass}`}>
          {typeTitle}
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          <div className="bg-blue-50 p-3 rounded-xl text-center border border-blue-100">
            <div className="text-xs text-blue-600 font-bold mb-1">정보오류</div>
            <div className="text-2xl font-black text-gray-800">{scores.A}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl text-center border border-purple-100">
            <div className="text-xs text-purple-600 font-bold mb-1">선후관계</div>
            <div className="text-2xl font-black text-gray-800">{scores.B}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-xl text-center border border-orange-100">
            <div className="text-xs text-orange-600 font-bold mb-1">시간예측</div>
            <div className="text-2xl font-black text-gray-800">{scores.C}</div>
          </div>
        </div>

        <div className="w-full max-w-[300px] h-[300px] mb-6">
          <Radar data={data} options={options} />
        </div>

        <div className="text-center mb-2">
          <span className="text-gray-500 text-sm mr-2">종합 점수</span>
          <span className="text-2xl font-black text-gray-800">{total}점</span>
          <span className="text-sm text-gray-400 ml-2">({severityStatus})</span>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
        <h3 className="font-bold text-lg mb-3 text-gray-900 flex items-center">
          <span className="text-2xl mr-2">💡</span> 처방전
        </h3>
        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: analysisContent }} />
      </div>

      <button 
        onClick={onRestart}
        className="w-full p-4 text-gray-400 hover:text-gray-600 underline transition-colors font-medium"
      >
        다시 진단하기
      </button>
    </div>
  );
}
