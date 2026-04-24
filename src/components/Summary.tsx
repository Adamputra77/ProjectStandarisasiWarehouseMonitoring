import { QuantitativeState } from '../types';
import { quantitativeData } from '../data/checklistData';

interface SummaryProps {
  state: QuantitativeState;
}

export default function Summary({ state }: SummaryProps) {
  let totalAchievedScore = 0;
  let summaryBreakdown = quantitativeData.map(category => {
    let categoryMaxWeight = category.weight;
    let categoryScore = 0;

    category.items.forEach(item => {
      const itemState = state[item.id];
      if (itemState) {
        categoryScore += itemState.score * item.weight;
      }
    });

    totalAchievedScore += categoryScore;

    return {
      name: category.name,
      maxPossible: categoryMaxWeight * 4,
      achieved: categoryScore,
      percentage: (categoryScore / (categoryMaxWeight * 4)) * 100 || 0
    };
  });

  const MAX_TOTAL_SCORE = 4000;
  const overallPercentage = (totalAchievedScore / MAX_TOTAL_SCORE) * 100;

  let grade = 'POOR';
  let gradeColor = 'bg-red-500';
  let gradeBg = 'bg-red-50';
  let gradeText = 'text-red-700';

  if (totalAchievedScore >= 3601) {
    grade = 'EXCELLENT';
    gradeColor = 'bg-emerald-500';
    gradeBg = 'bg-emerald-50';
    gradeText = 'text-emerald-700';
  } else if (totalAchievedScore >= 2801) {
    grade = 'GOOD';
    gradeColor = 'bg-blue-500';
    gradeBg = 'bg-blue-50';
    gradeText = 'text-blue-700';
  } else if (totalAchievedScore >= 2001) {
    grade = 'FAIR';
    gradeColor = 'bg-yellow-500';
    gradeBg = 'bg-yellow-50';
    gradeText = 'text-yellow-700';
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Overall Score Card */}
        <div className={`col-span-1 md:col-span-3 lg:col-span-1 p-6 rounded-2xl shadow-sm border ${gradeBg} border-opacity-50 border-gray-200 flex flex-col justify-center items-center text-center space-y-4`}>
          <h2 className="text-gray-500 font-medium uppercase tracking-wider text-sm">Overall Score</h2>
          <div className="flex items-baseline space-x-2">
            <span className={`text-5xl font-bold ${gradeText}`}>{totalAchievedScore}</span>
            <span className="text-2xl text-gray-400">/ 4000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${gradeColor}`} 
              style={{ width: `${Math.min(100, Math.max(0, overallPercentage))}%` }}
            ></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200/50 w-full">
            <span className={`inline-block px-4 py-1.5 rounded-full font-bold tracking-widest text-white ${gradeColor}`}>
              {grade}
            </span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Score Breakdown</h3>
          <div className="space-y-5">
            {summaryBreakdown.map((cat, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-sm font-medium text-gray-900">{cat.achieved} <span className="text-xs text-gray-400">/ {cat.maxPossible}</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, cat.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Legend */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Score Scale Range</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-red-50 text-red-800 text-center border border-red-100">
            <div className="font-bold text-lg mb-1">POOR</div>
            <div className="text-sm">0 - 2000</div>
          </div>
          <div className="p-4 rounded-lg bg-yellow-50 text-yellow-800 text-center border border-yellow-100">
            <div className="font-bold text-lg mb-1">FAIR</div>
            <div className="text-sm">2001 - 2800</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 text-blue-800 text-center border border-blue-100">
            <div className="font-bold text-lg mb-1">GOOD</div>
            <div className="text-sm">2801 - 3600</div>
          </div>
          <div className="p-4 rounded-lg bg-emerald-50 text-emerald-800 text-center border border-emerald-100">
            <div className="font-bold text-lg mb-1">EXCELLENT</div>
            <div className="text-sm">3601 - 4000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
