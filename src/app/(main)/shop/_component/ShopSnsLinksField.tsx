import { SnsLinkDTO } from '@/core/type/affiliation/shop.data'
import { memo, useCallback, useState } from 'react'
import SnsLinkItem from './SnsLinkItem'
import useCode from '@/hook/useCode'
import { Button, FormControl, FormLabel, IconButton } from '@mui/joy'
import Edit from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import useApi from '@/hook/useApi'
import { shopService } from '@/core/service/affiliate/shop.service'

type Props = {
  shopId: string
  snsLinks: SnsLinkDTO[]
  onChange: (snsLinks: SnsLinkDTO[]) => void
}

function ShopSnsLinksField({ shopId, snsLinks: snsLinksProp, onChange }: Props) {
  const [snsLinks, setSnsLinks] = useState(snsLinksProp)
  const [isEditMode, setIsEditMode] = useState(false)
  const { makeOptions, getDisplayName } = useCode()

  const snsTypeOptions = makeOptions('SNS_TYPE')

  const { execute, isLoading } = useApi({
    api: shopService.updateShopSnsLinks,
    onSuccess: (resData) => {
      setSnsLinks(resData.snsLinks)
      onChange(resData.snsLinks)
      setIsEditMode(false)
    },
  })

  const handleRemoveItem = (index: number) => {
    const newSnsLinks = snsLinks.filter((_, i) => i !== index)
    setSnsLinks(newSnsLinks)
  }

  const handleChangeItem = (index: number, newSnsLink: SnsLinkDTO) => {
    const newSnsLinks = snsLinks.map((snsLink, i) => (i === index ? newSnsLink : snsLink))
    setSnsLinks(newSnsLinks)
  }

  const handleCancel = useCallback(() => {
    setSnsLinks(snsLinksProp)
    setIsEditMode(false)
  }, [snsLinksProp])

  return (
    <>
      <div className="flex items-center justify-between">
        <FormLabel>SNS 링크</FormLabel>
        {isEditMode ? (
          <IconButton
            size="sm"
            onClick={() =>
              setSnsLinks(
                (prev) =>
                  [
                    ...prev,
                    { snsType: 'INSTAGRAM', linkType: 'SHOP_LINK', linkUrl: '', displayOrder: prev.length },
                  ] as SnsLinkDTO[],
              )
            }
          >
            <Add fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="sm" onClick={() => setIsEditMode(true)}>
            <Edit sx={{ fontSize: 12 }} />
          </IconButton>
        )}
      </div>

      {snsLinks.map((snsLink, index) => (
        <SnsLinkItem
          key={index}
          snsLink={snsLink}
          isEditMode={isEditMode}
          onRemove={() => handleRemoveItem(index)}
          onChange={(value) => handleChangeItem(index, value)}
          snsTypeOptions={snsTypeOptions}
          getDisplayName={getDisplayName}
        />
      ))}
      {isEditMode && (
        <div className="flex justify-end mt-2 gap-1">
          <Button size="sm" variant="plain" color="neutral" onClick={handleCancel}>
            취소
          </Button>
          <Button size="sm" onClick={() => execute({ shopId, newSnsLinks: snsLinks })} loading={isLoading}>
            저장
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(ShopSnsLinksField)
