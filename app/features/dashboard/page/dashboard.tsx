import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getActionHistory } from '../queries';
import type { Route } from './+types/dashboard';
import { index } from 'drizzle-orm/gel-core';

const userActionHistory = [
  { action: '물 마시기', count: 12 },
  { action: '산책하기', count: 8 },
  { action: '명상하기', count: 5 },
  { action: '일기쓰기', count: 3 },
  { action: '정리정돈', count: 2 },
];

const userRanking = [
  { name: '나', score: 87 },
  { name: '소연', score: 91 },
  { name: '민재', score: 75 },
  { name: '지우', score: 68 },
  { name: '하준', score: 55 },
];

export const loader = async () => {
  const actionHistory = await getActionHistory()
  return actionHistory
}

export function meta() {
  return [
    { title: "tepPick | Dashboard" },
    {
      property: "og:title",
      content: "tepPick | Dashboard",
    },
    {
      name: "description",
      content: " tepPick | Dashboard",
    },
  ];
}

const DashboardPage = ({ loaderData }: { loaderData: { id: number; action: string; count: number }[] }) => {

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-yellow-50 to-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">👣 나의 대시보드</h1>
        <p className="text-lg text-gray-600 mb-10">Step by step, 당신의 행동이 변화를 만듭니다.</p>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🌞 오늘의 행동</h2>
          <p className="text-gray-600 mb-2">✨ 오늘은 <strong>산책하기</strong>를 완료했어요!</p>
          <p className="text-gray-500 text-sm">💡 어제보다 1개 더 실천했어요. 계속 이어가 볼까요?</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 나의 행동 히스토리</h2>
          <p className="text-gray-600 mb-6">지난 7일간의 기록을 확인하고, 지속성을 높여보세요.</p>
          <ResponsiveContainer width="100%" height={650}>
            <BarChart data={loaderData} layout="vertical" margin={{ left: 30, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="action" />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 4, 4]}>
                {loaderData.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill="#60a5fa" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🏅 전체 행동 점수 랭킹</h2>
          <ul className="text-left">
            {userRanking.map((user, idx) => (
              <li key={user.name} className="mb-2 text-gray-700">
                <span className="inline-block w-8 font-bold text-gray-800">{idx + 1}위</span>
                {user.name === '나' ? (
                  <span className="font-semibold text-blue-600">{user.name} (내 점수: {user.score})</span>
                ) : (
                  <span>{user.name} - {user.score}점</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg mt-12">
          🎯 <strong>이번 주 목표:</strong> 5일 이상 실천 기록 달성하기! 작은 습관이 큰 변화를 만듭니다.
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;