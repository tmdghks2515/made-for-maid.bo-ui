'use client'

export default function KakaoSignInButton() {
  return (
    <button
      className="flex items-center justify-center w-full h-12 px-4 text-sm font-semibold text-white bg-[#FEE500] rounded-lg shadow-md hover:bg-[#FEE500]/80 focus:outline-none focus:ring-2 focus:ring-[#FEE500]/50"
      onClick={() => {}}
    >
      <img
        src="https://churr-bucket.s3.ap-northeast-2.amazonaws.com/common/logo/kakao-logo.png"
        alt="kakao-logo"
        width="20"
        height="20"
        className="mr-2"
      />
      카카오로 계속하기
    </button>
  )
}
