import { useEffect, useState } from "react"
import { Link } from "react-router"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Button } from "../components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import water from "~/assets/images/water.png"
import workout from "~/assets/images/workout.png"
import reading from "~/assets/images/reading.png"
import widget from "~/assets/images/widget.png"
import steppick from "~/assets/images/steppick_ori.png"
import stepPickAbout from "~/assets/images/steppick-about.png"

const actionPicks = [
  {
    title: "30분 산책 하기",
    image: workout,
    link: "tryActionPick1"
  },
  {
    title: "물마시기",
    image: water,
    link: "tryActionPick2"
  },
  {
    title: "책읽기",
    image: reading,
    link: "tryActionPick2"
  },
  {
    title: "물마시기",
    image: "https://via.placeholder.com/150",
    link: "tryActionPick2"
  }
]

export default function Home() {
  return (
    <>
      <div className="bg-[#F6F4EC] space-y-32 pt-20 px-[140px]">
        <section id="download" className="px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between  gap-10">
            <div className="flex-1 flex items-center justify-center">
              <div className="rounded-xl w-[300px] h-[300px] flex items-center justify-center ">
                <img src={steppick} alt="character" className="w-full h-full  object-cover rounded-xl" />
              </div>
            </div>
            <div className="flex-1  ">
              <h2 className="flex flex-col gap-2 text-4xl font-[600] mb-4">
                <p className="text-[#333333] text-5xl">하루에 한개씩</p>
                <p className="text-[#333333] text-5xl">스탭픽과 함께 해보세요</p>
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
        <section id="about" className="flex flex-col items-center justify-center py-20">
          <div className='w-full'>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-5xl text-center font- mb-4">스탭픽이란?</h2>
              {/* <p className="text-2xl max-w-xl"></p> */}
            </div>
            <div className="flex gap-8 mt-8 items-center justify-center">
              <div className="flex-1/2 mt-8 bg-gray-100 w-full h-[500px] rounded-xl flex items-center justify-center">
                <img src={stepPickAbout} alt="character" className="w-full h-full  object-cover rounded-xl" />
              </div>
              <div className="flex-1/2 flex flex-col items-center  gap-4">
                <div>
                  <p className="text-2xl leading-relaxed">
                    작고 부담 없는 행동을 기록하며<br />
                    함께 성장하는 따뜻한 마음 동행 플랫폼입니다.
                  </p>

                  <p className="text-2xl leading-relaxed">
                    매일의 소소한 선택이 쌓여<br />
                    어느새 삶의 방향을 바꿉니다.
                  </p>

                  <p className="text-2xl leading-relaxed">
                    스탭픽은 <strong>혼자보다 함께하는 힘</strong>을 믿습니다.
                  </p>

                  <p className="text-2xl leading-relaxed mt-8">
                    나의 하루를 가볍게 적고,<br />
                    서로를 응원하며 꾸준히 이어가고 싶은 사람들을 위한 공간.
                  </p>
                  <p className="text-2xl leading-relaxed">
                    크고 거창하지 않아도 괜찮아요.<br />
                    <strong>당신의 일상 속 변화를, 스탭픽이 함께합니다.</strong>
                  </p>
                </div>

              </div>

            </div>
          </div>

        </section>
        <section id="action-picks" className="flex flex-col items-center justify-center py-20 " >
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-5xl text-center font- mb-4">픽과 함께하기!</h2>
          </div>
          <div className="mt-8 relative group w-[1555px] ">
            {typeof window !== 'undefined' && (
              <ClientOnly>
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={3}
                  slidesToScroll={1}
                  arrows={true}
                  className="action-picks-slider"
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      }
                    }
                  ]}
                >
                  {actionPicks.map((pick) => (
                    <div key={pick.title} className="px-2 w-full">
                      <div className="h-[500px] max-w-[500px] min-w-[500px] bg-amber-100 rounded-xl flex items-center justify-center">
                        <Link to={`/action-pick/${pick.link}`} className="flex items-center justify-center w-full h-full">
                          <img src={pick.image} alt={pick.title} className="w-full h-full object-cover rounded-xl" />
                        </Link>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl  mt-4">{pick.title}</h3>
                        <Button variant="outline" className="rounded-xl"><ChevronRightIcon className="w-6 h-6" /></Button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </ClientOnly>
            )}
          </div>
        </section>
        <section id="action-picks" className="px-8 py-20">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-5xl text-center font- my-8">뉴스</h2>
            <div className="flex w-128 h-128 bg-amber-100">
              <img src={widget} alt="widget" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="font-bold flex flex-col items-left">
              <p className="mt-2">StepPick 위젯이 나왔어요!</p>
              <p className="mt-2">슬퍼하기도,</p>
              <p className="mt-2">웃기도,</p>
              <p className="mt-2">피곤해하기도해요..</p>
            </div>

          </div>
        </section>
        <section id="news" className="px-8 py-20">
          <div className="flex flex-col items-center ">
            <h2 className="text-5xl text-center font- mb-4">문의하기</h2>
            <div className="flex flex-col items-center mt-20  w-128 h-128 ">
              <p>[Apple Store 배너]</p>
              <p>email@gmail.com</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
