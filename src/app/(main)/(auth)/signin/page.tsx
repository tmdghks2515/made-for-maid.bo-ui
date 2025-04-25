'use client'

import KakaoSignInButton from '@/component/button/KakaoSignInButton'
import { motion } from 'framer-motion'
import useApi from '@/hook/useApi'
import { adminAuthApi } from '@/core/api/user/admin-auth.api'
import { AdminSignInResDTO } from '@/core/type/user/user.data'
import { useRouter } from 'next/navigation'
import useAdminStore from '@/store/useAdminStore'

export default function SignInPage() {
  const router = useRouter()
  const signIn = useAdminStore((state) => state.signIn)

  const { execute } = useApi({
    api: adminAuthApi.adminKakaoSignIn,
    params: {
      oauthCode: '124134134',
      email: 'tmdghks2515@naver.com',
      oauthId: 'gdagd',
    },
    onSuccess: (res: AdminSignInResDTO) => {
      console.log('로그인 성공', res)
      if (res.status === 'SIGN_IN_SUCCESS') {
        signIn(res.admin!!)
        router.push('/')
      } else if (res.status === 'PROFILE_SELECT') {
        router.push('/profile')
      } else if (res.status === 'SIGN_UP_SUCCESS') {
        router.push('/signup/role')
      } else {
        alert('로그인 실패')
      }
    },
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex-1 flex flex-col justify-between gap-16">
      <div>
        <div className="flex items-baseline mb-16 pt-4">
          <img
            src="https://churr-bucket.s3.ap-northeast-2.amazonaws.com/common/logo/main_logo_80_40.PNG"
            alt="churr-logo-main"
            width={60}
          />
          <span className="text-muted text-xs font-bold">관리자</span>
        </div>

        <motion.div variants={container} className="text-2xl px-4" initial="hidden" animate="show">
          <p className="leading-9">
            <motion.span variants={item}>
              <b>단골 고객</b>을 늘리고,
              <br />
            </motion.span>
            <motion.span variants={item}>
              수익을 <b>다각화</b>하는 <br />
            </motion.span>
            <motion.span variants={item}>메이드카페 플랫폼.</motion.span>
          </p>
        </motion.div>
      </div>

      <div>
        <div className="text-center text-sm text-subtle mb-2">로그인 후, 메이드카페를 쉽게 관리해보세요</div>
        <KakaoSignInButton clickAction={execute} />
      </div>
    </div>
  )
}
