'use client'

import { Button, Divider, FormControl, FormLabel, IconButton, Input, Option, Select } from '@mui/joy'
import useCode from '@/hook/useCode'
import useCheckIsClient from '@/hook/useCheckCSR'
import Add from '@mui/icons-material/Add'
import { useFormik } from 'formik'
import { ShopDTO } from '@/core/type/affiliate/shop.data'
import { useEffect } from 'react'
import ShopConceptsSelect from '@/app/(main)/(auth)/signup/shop-info/_components/ShopConceptsField'
import ShopNameField from '@/app/(main)/(auth)/signup/shop-info/_components/ShopNameField'
import ShopContactNumberField from '@/app/(main)/(auth)/signup/shop-info/_components/ShopContactNumberField'
import ShopSnsLinksField from '@/app/(main)/(auth)/signup/shop-info/_components/ShopSnsLinksField'
import ShopMenuImagesField from '@/app/(main)/(auth)/signup/shop-info/_components/ShopMenuImagesField'

export default function ShopInfoPage() {
  const isClient = useCheckIsClient()

  const { values, handleChange, setFieldValue } = useFormik<ShopDTO>({
    initialValues: {
      name: '',
      contactNumber: '',
      shopConcepts: [],
      snsLinks: [
        {
          linkType: 'SNS_LINK_SHOP',
          snsType: 'INSTAGRAM',
          linkUrl: '',
          displayOrder: 0,
        },
      ],
      menuImageUrls: [],
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  useEffect(() => {
    console.log('values >>>', values)
  }, [values])

  if (!isClient) return null
  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">업체 정보를 입력해주세요.</p>

        <div className="flex flex-col gap-4">
          <ShopNameField name={values.name} handleChange={handleChange} />
          <ShopConceptsSelect shopConcepts={values.shopConcepts} setFieldValue={setFieldValue} />
          <ShopContactNumberField contactNumber={values.contactNumber} handleChange={handleChange} />

          <Divider sx={{ marginY: 2 }} />

          <ShopSnsLinksField snsLinks={values.snsLinks} setFieldValue={setFieldValue} />

          <Divider sx={{ marginY: 2 }} />

          <ShopMenuImagesField menuImageUrls={values.menuImageUrls} setFieldValue={setFieldValue} />
        </div>
      </div>

      <Button variant="outlined">다음</Button>
    </>
  )
}
