import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Card } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Edit, InfoIcon, Settings } from 'lucide-react';

const ProfilePage = () => {
  const [testReply, setTestReply] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [testStarted, setTestStarted] = useState(false);

  const fullReply = "지금 바로 가볍게 산책을 시작해보는 건 어떨까요?";

  const handleTest = () => {
    setTestReply("");
    setTypingIndex(0);
    setTestStarted(true);
  };

  useEffect(() => {
    if (!testStarted) return;
    if (typingIndex < fullReply.length) {
      const timeout = setTimeout(() => {
        setTestReply((prev) => prev + fullReply[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, testStarted]);

  return (
    <div className="h-screen flex flex-col items-center mx-auto bg-[#F6F4EC]">
      <div className="px-20 pt-40 min-w-[750px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">[User Name]</h1>
              <p className="text-gray-600">@username</p>
            </div>
          </div>
          <div className="flex gap-3">
          </div>
        </div>
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">정보</h2>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-" />
              정보 편집
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">가입날짜</h3>
              <p>2025년 5월 31일</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">이메일</h3>
              <p>example@email.com</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          {/*
            AI 메세지 section with edit/view toggle
          */}
          <AIMessageSection />
        </Card>
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">테스트</h2>
            <Button
              variant="default"
              size="sm"
              onClick={handleTest}
            >
              테스트 실행
            </Button>
          </div>
          <div className="space-y-2 text-gray-700">
            <p className="font-medium mt-4">AI 응답:</p>
            <div className="p-4 bg-white border rounded-md whitespace-pre-wrap min-h-[56px]">
              {typingIndex > 0 && testReply}
            </div>
          </div>
        </Card>
      </div >
    </div >
  );
};

export default ProfilePage;
// AI 메세지 section as component
const AI_INITIAL_MESSAGES = [
  "사용자는 주로 아침 시간에 여유가 있어, 하루의 시작을 계획하기에 적합합니다.",
  "간단하지만 꾸준한 실천을 선호하여, 지속 가능한 루틴 구성이 중요합니다.",
  "건강에 대한 관심이 높아, 웰니스와 관련된 행동 추천이 효과적입니다.",
  "지식 습득에 의욕적이므로, 새로운 인사이트를 제공하는 콘텐츠가 잘 맞습니다.",
  "작은 변화로 큰 성장을 추구하는 스타일로, 일상 속 행동 트래킹이 유용할 것입니다."
];

function AIMessageSection() {
  const [editing, setEditing] = useState(false);
  const [messages, setMessages] = useState<string[]>(AI_INITIAL_MESSAGES);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">AI 메세지</h2>
          <InfoIcon className="w-4 h-4 " />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditing((prev) => !prev)}
        >
          <Settings className="w-4 h-4 mr-1" />
          {editing ? '저장하기' : '메세지 편집하기'}
        </Button>
      </div>
      <div className="space-y-4">
        {editing ? (
          <>
            <ul className="space-y-2">
              {messages.map((msg, index) => (
                <li key={index}>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    value={msg}
                    onChange={(e) => {
                      const newMessages = [...messages];
                      newMessages[index] = e.target.value;
                      setMessages(newMessages);
                    }}
                  />
                </li>
              ))}
            </ul>
            <Button
              type="button"
              size="sm"
              className="mt-2"
              onClick={() => setMessages([...messages, ""])}
            >
              + 새 메세지 추가
            </Button>
          </>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}