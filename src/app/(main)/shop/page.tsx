'use client'

import MainWrapper from '@/component/layout/wrapper/MainWrapper'
import { shopApi } from '@/core/api/affiliate/shop.api'
import useApi from '@/hook/useApi'
import useHeaderStore from '@/store/useHeaderStore'
import { useEffect, useState } from 'react'
import ShopNameField from './_component/ShopNameField'
import { ShopDTO } from '@/core/type/affiliation/shop.data'
import ShopConceptsField from './_component/ShopConceptsField'
import ShopSnsLinksField from './_component/ShopSnsLinksField'
import ShopMenuImagesField from './_component/ShopMenuImagesField'

export default function ShopInfoPage() {
  const [shop, setShop] = useState<ShopDTO>({
    name: '',
    contactNumber: '',
    shopConcepts: [],
    menuImages: [],
    snsLinks: [],
    createdAt: '',
  })

  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle)

  const { execute } = useApi({
    api: shopApi.getShopDetail,
    executeImmediately: true,
    onSuccess: setShop,
  })

  useEffect(() => {
    setHeaderTitle('업체 정보')
  }, [])

  if (!shop || !shop.id) return null
  return (
    <MainWrapper className="">
      <div className="p-2 mt-4 flex flex-col gap-6">
        <ShopNameField
          shopId={shop.id}
          name={shop.name}
          onChange={(newName) => setShop((prev) => ({ ...prev, name: newName }))}
        />
        <ShopConceptsField
          shopId={shop.id}
          concepts={shop.shopConcepts}
          onChange={(newConcepts) => setShop((prev) => ({ ...prev, shopConcepts: newConcepts }))}
        />
        <ShopSnsLinksField
          shopId={shop.id}
          snsLinks={shop.snsLinks}
          onChange={(newSnsLinks) => setShop((prev) => ({ ...prev, snsLinks: newSnsLinks }))}
        />
        <ShopMenuImagesField
          shopId={shop.id}
          menuImages={shop.menuImages}
          onChange={(newMenuImages) => setShop((prev) => ({ ...prev, menuImages: newMenuImages }))}
        />
      </div>
    </MainWrapper>
  )
}
