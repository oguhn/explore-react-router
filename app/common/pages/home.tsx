import Navigator from "../components/navigator"

export default function Home() {
  return (
    <>
      <div className="mt-[60px] space-y-32">
        <section id="download" className="px-8 py-20 bg-[#fdfcf9]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-gray-900">Step Pick</span>
              </h2>
              <p className="text-xl font-semibold text-orange-500 mb-6">
                <span>한걸음만 나아가 보세요</span>
              </p>
              <div className="flex gap-4">
                <p className="text-gray-900"> [app store 배너]</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-gray-100 w-64 h-64 rounded-xl flex items-center justify-center">
                [캐릭터 이미지]
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="px-8 py-20 bg-white">
          <h2 className="text-3xl font-bold mb-4">About StepPick</h2>
          <p className="text-lg max-w-2xl">StepPick은 매일의 작은 행동을 챌린지로 기록하고, 크루와 함께 성장하는 습관화 플랫폼입니다.</p>
          <div className="mt-8 bg-gray-100 w-full h-64 rounded-xl flex items-center justify-center">[이미지 Placeholder]</div>
        </section>
        <section id="faq" className="px-8 py-20 bg-gray-50">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-lg max-w-2xl">자주 묻는 질문들을 모아두었어요. 사용이 처음이시라면 참고해보세요.</p>
          <div className="mt-8 bg-gray-200 w-full h-40 rounded-xl flex items-center justify-center">[FAQ 이미지]</div>
        </section>
        <section id="shop" className="px-8 py-20 bg-white">
          <h2 className="text-3xl font-bold mb-4">Shop</h2>
          <p className="text-lg max-w-2xl">챌린지 성공으로 얻은 포인트를 사용할 수 있는 리워드 샵입니다. (예정)</p>
          <div className="mt-8 bg-gray-100 w-full h-64 rounded-xl flex items-center justify-center">[샵 이미지]</div>
        </section>
        <section id="contact" className="px-8 py-20 bg-gray-50">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg max-w-2xl">문의사항이 있으신가요? 아래 이메일로 연락주세요.</p>
          <div className="mt-8 bg-gray-200 w-full h-24 rounded-xl flex items-center justify-center">contact@steppick.app</div>
        </section>
      </div>
    </>
  )
}
