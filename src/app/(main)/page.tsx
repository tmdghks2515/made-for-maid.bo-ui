import KakaoSignInButton from '@/component/button/KakaoSignInButton'

export default function MainPage() {
  return (
    <div className=" flex-1 flex flex-col items-center justify-between bg-background text-foreground">
      <div>
        <p className="text-xs text-amber-400 text-center">메이드 카페의 수익을 다양하게</p>
        <img
          src="https://churr-bucket.s3.ap-northeast-2.amazonaws.com/common/logo/churr-logo-main.PNG"
          alt="churr-logo-main"
          width="200"
        />
      </div>

      <KakaoSignInButton />
    </div>
  )
}
