'use client'

import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import useCheckIsClient from '@/hook/useCheckIsClient'
import { useFormik } from 'formik'
import { ShopDTO } from '@/core/type/affiliation/shop.data'
import ShopConceptsSelect from '@/app/(auth)/signup/shop-info/_component/ShopConceptsField'
import ShopNameField from '@/app/(auth)/signup/shop-info/_component/ShopNameField'
import ShopContactNumberField from '@/app/(auth)/signup/shop-info/_component/ShopContactNumberField'
import ShopSnsLinksField from '@/app/(auth)/signup/shop-info/_component/ShopSnsLinksField'
import ShopMenuImagesField from '@/app/(auth)/signup/shop-info/_component/ShopMenuImagesField'
import * as yup from 'yup'
import { contactNumberRegex } from '@/util/regex.util'
import useApi from '@/hook/useApi'
import { shopService } from '@/core/service/affiliate/shop.service'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ShopInfoPage() {
  const isClient = useCheckIsClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const { execute, isLoading } = useApi({
    api: shopService.createShop,
    onSuccess: (response) => {
      router.push(`/signup/nickname?role=${role}&shopId=${response.id}`)
    },
  })

  const validationSchema = yup.object().shape({
    name: yup.string().required('업체명을 입력해주세요.'),
    shopConcepts: yup.array().min(1, '업체 컨셉을 선택해주세요.'),
    contactNumber: yup
      .string()
      .required('연락처를 입력해주세요.')
      .matches(contactNumberRegex, '연락처 형식이 올바르지 않습니다.'),
  })

  const { values, handleChange, setFieldValue, setValues, handleSubmit, isValid } = useFormik<ShopDTO>({
    initialValues: {
      name: '',
      contactNumber: '',
      shopConcepts: [],
      snsLinks: [],
      menuImages: [],
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (submitValues) => {
      execute(submitValues)
    },
  })

  if (!isClient) return null
  return (
    <>
      <div className="mb-4">
        <p className="text-2xl font-bold mb-8">업체 정보를 입력해주세요.</p>

        <div className="flex flex-col gap-4">
          <ShopNameField name={values.name} handleChange={handleChange} />
          <ShopConceptsSelect shopConcepts={values.shopConcepts} setFieldValue={setFieldValue} />
          <ShopContactNumberField contactNumber={values.contactNumber} handleChange={handleChange} />

          <Divider sx={{ marginY: 2 }} />

          <ShopSnsLinksField snsLinks={values.snsLinks} setValues={setValues} />

          <Divider sx={{ marginY: 2 }} />

          <ShopMenuImagesField menuImages={values.menuImages} setFieldValue={setFieldValue} />
        </div>
      </div>

      <Button variant="soft" onClick={() => handleSubmit()} disabled={!isValid} loading={isLoading}>
        다음
      </Button>
    </>
  )
}
