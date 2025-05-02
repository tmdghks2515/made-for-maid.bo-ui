type Props = {
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ size = 'sm' }: Props) {
  return (
    <img
      alt="메인로고"
      // src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/common/logo/jelly_1_40_40.png`}
      src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${logoImageUrl[size]}`}
      width={width[size]}
    />
  )
}

const logoImageUrl = {
  lg: '/common/logo/jelly_1_260_130.png',
  md: '/common/logo/main_logo_130_65.PNG',
  sm: '/common/logo/main_logo_130_65.PNG',
}
const width = {
  lg: 130,
  md: 65,
  sm: 50,
}
