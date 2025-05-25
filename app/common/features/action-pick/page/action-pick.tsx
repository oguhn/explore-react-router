import { useParams } from "react-router"
import { Button } from "~/common/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import { Link } from "react-router"
import water from "~/assets/images/water.png"
import workout from "~/assets/images/workout.png"
import reading from "~/assets/images/reading.png"
import { ShinyButton } from "~/common/components/ui/shiny-button"


const actionPickDetails = {
  tryActionPick1: {
    title: "30분 산책 하기",
    image: workout,
    description: "하루 30분, 가벼운 산책으로 시작하는 건강한 습관\n\n매일 30분의 산책은 우리의 신체적, 정신적 건강에 큰 도움이 됩니다. 신선한 공기를 마시며 주변을 둘러보는 시간은 스트레스 해소에도 효과적이에요.\n\n오늘부터 시작해보세요. 작은 발걸음이 모여 큰 변화를 만듭니다.",
    benefits: [
      "스트레스 감소",
      "심장 건강 개선",
      "기분 전환",
      "에너지 레벨 향상"
    ]
  },
  tryActionPick2: {
    title: "물마시기",
    image: water,
    description: "하루 8잔의 물, 건강한 습관의 시작\n\n충분한 수분 섭취는 우리 몸의 기본적인 건강을 유지하는 데 필수적입니다. 물은 신진대사를 촉진하고, 피로를 줄이며, 피부 건강에도 도움을 줍니다.\n\n오늘부터 하루 8잔의 물 마시기를 시작해보세요.",
    benefits: [
      "신진대사 촉진",
      "피로 감소",
      "피부 건강 개선",
      "집중력 향상"
    ]
  },
  tryActionPick3: {
    title: "책읽기",
    image: reading,
    description: "하루 30분 독서, 마음의 양식\n\n독서는 우리의 지적 성장과 정서적 안정에 큰 도움이 됩니다. 새로운 지식과 경험을 얻을 수 있고, 스트레스 해소에도 효과적이에요.\n\n오늘부터 하루 30분의 독서 시간을 가져보세요.",
    benefits: [
      "지적 성장",
      "스트레스 감소",
      "집중력 향상",
      "상상력 발달"
    ]
  }
}

export default function ActionPick() {
  const { id } = useParams()
  const pick = actionPickDetails[id as keyof typeof actionPickDetails]

  if (!pick) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Action Pick을 찾을 수 없습니다.</h1>
        <Link to="/" className="mt-4">
          <Button variant="outline">홈으로 돌아가기</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F4EC] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeftIcon className="w-4 h-4" />
            <span>뒤로가기</span>
          </Button>
        </Link>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl aspect-square rounded-2xl overflow-hidden mb-12">
            <img
              src={pick.image}
              alt={pick.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-center">{pick.title}</h1>

            <div className="prose prose-lg max-w-none mb-12">
              {pick.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-white/50 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">이 Action Pick의 장점</h2>
              <ul className="grid grid-cols-2 gap-4">
                {pick.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <ShinyButton className="px-8 py-6 text-lg cursor-pointer">
                이 Action Pick 시작하기
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}