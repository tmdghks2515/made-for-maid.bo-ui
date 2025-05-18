'use client'

import KakaoSignInButton from '@/component/button/KakaoSignInButton'
import { motion } from 'framer-motion'
import useApi from '@/hook/useApi'
import { adminAuthService } from '@/core/service/user/admin-auth.service'
import { AdminSignInResDTO } from '@/core/type/user/admin.data'
import { useRouter } from 'next/navigation'
import useAdminStore from '@/store/useAdminStore'
import { AdminKakaoSignInCommand } from '@/core/type/user/admin.command'
import useAuthorize from '@/hook/useAuthorize'
import Header from '@/component/layout/header/Header'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'
import Logo from '@/component/display/Logo'

export default function SignInPage() {
  const router = useRouter()
  const signIn = useAdminStore((state) => state.signIn)
  const { setAccessToken } = useAuthorize()

  const { execute } = useApi<AdminKakaoSignInCommand, AdminSignInResDTO>({
    api: adminAuthService.adminKakaoSignIn,
    onSuccess: (res: AdminSignInResDTO) => {
      res.accessToken && setAccessToken(res.accessToken)

      if (res.status === 'SIGN_IN_SUCCESS') {
        res.admin && signIn(res.admin)
        router.push('/')
      } else if (res.status === 'PROFILE_SELECT') {
        router.push('/profile')
      } else if (res.status === 'SIGN_UP_SUCCESS') {
        router.push('/signup/role')
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
    <>
      <Header>
        <div className="flex justify-between items-baseline">
          <Logo />
          <span className="text-muted text-xs font-bold">관리자</span>
        </div>
      </Header>

      <MainWrapper>
        <div className="pt-16 flex-1 flex flex-col justify-between gap-16">
          <div>
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
            <KakaoSignInButton
              clickAction={() =>
                execute({
                  oauthCode: '124134134',
                  email: 'tmdghks2515@naver.com',
                  oauthId: 'gdagd',
                })
              }
            />
          </div>
        </div>
      </MainWrapper>
    </>
  )
}
