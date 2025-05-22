import steppick from "~/assets/images/steppick_ori.png"
import cloud from "~/assets/images/cloud.png"

export default function Home() {
  return (
    <>
      <div className="bg-[#F6F4EC] space-y-32 pt-20">
        <section id="download" className="px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between  gap-10">
            <div className="flex-1 flex items-center justify-center">
              <div className="rounded-xl h-160 flex items-center justify-center ">
                <img src={steppick} alt="character" className="w-full h-full  object-cover rounded-xl" />
              </div>
            </div>
            <div className="flex-1  ">
              <h2 className="flex flex-col gap-2 text-4xl font-[600] mb-4">
                <p className="text-[#333333] text-5xl">하루에 한개씩</p>
                <p className="text-[#333333] text-5xl">Step Pick과 함께 해보세요</p>
              </h2>
              <p className="text-xl font-semibold text-orange-500 mb-6">
                <span>한걸음만 나아가 보세요</span>
              </p>
              <div className="flex gap-4">
                <p className="text-gray-900"> [app store 배너]</p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="px-8 py-20">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-5xl text-center font- mb-4">About Step Pick</h2>
            {/* <p className="text-2xl max-w-xl"></p> */}
          </div>
          <div className="flex gap-10 items-center justify-center">
            <div className="flex-1/2 mt-8 bg-gray-100 w-full h-100 rounded-xl flex items-center justify-center">
              <img src={cloud} alt="character" className="w-full h-full  object-cover rounded-xl" />
            </div>
            <div className="flex-1/2 flex flex-col  items-center  gap-4">
              <p className="text-xl max-w-xl font-">StepPick은 작지만 의미 있는 행동을 기록하고, 함께 성장하는 챌린지를 만들어가는 마음 케어 플랫폼입니다.
                매일의 선택이 습관이 되고, 습관이 변화가 됩니다. StepPick은 혼자가 아닌 ‘함께’의 힘을 믿습니다. 나의 걸음을 기록하고, 팀과 함께 응원하며 지속가능한 루틴을 만들어보세요. 작지만 꾸준한 실천이 결국 큰 변화를 만듭니다.
                당신의 하루에, StepPick이 함께합니다.</p>
            </div>

          </div>

        </section>
        <section id="action-picks" className="px-8 py-20 bg-white">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl text-center font-bold mb-4">Action Picks</h2>
            <p className="text-xl max-w-xl">가볍게 시작해 봐요!</p>
            {/* <p className="text-2xl max-w-xl"></p> */}
          </div>
          <div className="mt-8 bg-gray-100 w-full h-64 rounded-xl flex items-center justify-center">[이미지 Placeholder]</div>
        </section>
        <section id="action-picks" className="px-8 py-20 bg-gray-50">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-lg max-w-2xl">자주 묻는 질문들을 모아두었어요. 사용이 처음이시라면 참고해보세요.</p>
          <div className="mt-8 bg-gray-200 w-full h-40 rounded-xl flex items-center justify-center">[FAQ 이미지]</div>
        </section>
        <section id="news" className="px-8 py-20 bg-white">
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
