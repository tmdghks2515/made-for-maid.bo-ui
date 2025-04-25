'use client'

type Props = {
  clickAction: () => void
}

export default function KakaoSignInButton({ clickAction }: Props) {
  return (
    <button
      className="cursor-pointer flex items-center justify-center w-full h-10 px-4 text-xs font-semibold text-[var(--kakao-brown)] bg-[var(--kakao-yellow)] rounded-md active:bg-[var(--kakao-yellow)]/80 ease-in-out"
      onClick={clickAction}
    >
      <img src="/icon/kakao-logo.svg" alt="kakao-logo" width="15" height="15" className="mr-2" />
      카카오 계정으로 계속하기
    </button>
  )
}
