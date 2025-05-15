import { SnsLinkDTO } from '@/core/type/affiliation/shop.data'
import { memo, useState } from 'react'
import SnsLinkItem from './SnsLinkItem'
import useCode from '@/hook/useCode'

type Props = {
  shopId: string
  snsLinks: SnsLinkDTO[]
  onChange: (snsLinks: SnsLinkDTO[]) => void
}

function ShopSnsLinksField({ shopId, snsLinks: snsLinksProp, onChange }: Props) {
  const [snsLinks, setSnsLinks] = useState(snsLinksProp)
  const [isEditMode, setIsEditMode] = useState(false)
  const { makeOptions } = useCode()

  const snsTypeOptions = makeOptions('SNS_TYPE')

  const handleRemoveItem = (index: number) => {
    const newSnsLinks = snsLinks.filter((_, i) => i !== index)
    setSnsLinks(newSnsLinks)
    onChange(newSnsLinks)
  }

  const handleChangeItem = (index: number, newSnsLink: SnsLinkDTO) => {
    const newSnsLinks = snsLinks.map((snsLink, i) => (i === index ? newSnsLink : snsLink))
    setSnsLinks(newSnsLinks)
    onChange(newSnsLinks)
  }

  return (
    <div>
      {snsLinks.map((snsLink, index) => (
        <SnsLinkItem
          snsLink={snsLink}
          key={index}
          isEditMode={isEditMode}
          onRemove={() => handleRemoveItem(index)}
          onChange={() => handleChangeItem(index, snsLink)}
          snsTypeOptions={snsTypeOptions}
        />
      ))}
    </div>
  )
}

export default memo(ShopSnsLinksField)
