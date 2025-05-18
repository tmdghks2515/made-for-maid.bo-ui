import MultiSelectChips from '@/component/input/MultiSelectChips'
import { shopService } from '@/core/service/affiliate/shop.service'
import { ShopConcept } from '@/core/type/affiliation/shop.data'
import Edit from '@mui/icons-material/Edit'
import useApi from '@/hook/useApi'
import useCode from '@/hook/useCode'
import { Button, Chip, FormControl, FormLabel, IconButton } from '@mui/joy'
import { memo, useState } from 'react'

type Props = {
  shopId: string
  concepts: ShopConcept[]
  onChange: (newConcepts: ShopConcept[]) => void
}

function ShopConceptsField({ shopId, concepts: conceptsProp, onChange }: Props) {
  const [concepts, setConcepts] = useState(conceptsProp)
  const [isEditMode, setIsEditMode] = useState(false)

  const { makeOptions, getDisplayName } = useCode()

  const { execute, isLoading } = useApi({
    api: shopService.updateShopConcepts,
    onSuccess: (resData) => {
      onChange(resData.shopConcepts)
      setIsEditMode(false)
    },
  })

  return (
    <FormControl>
      <div className="flex items-center justify-between">
        <FormLabel>컨셉</FormLabel>
        {!isEditMode && (
          <IconButton onClick={() => setIsEditMode(true)} size="sm">
            <Edit sx={{ fontSize: 12 }} />
          </IconButton>
        )}
      </div>
      {isEditMode ? (
        <div className="flex gap-1">
          <MultiSelectChips
            value={concepts}
            options={makeOptions('SHOP_CONCEPT')}
            onChange={setConcepts}
            className={'flex-1'}
          />
          <Button
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => {
              setConcepts(conceptsProp)
              setIsEditMode(false)
            }}
          >
            취소
          </Button>
          <Button
            size="sm"
            loading={isLoading}
            onClick={() => {
              execute({ shopId, newShopConcepts: concepts })
            }}
          >
            저장
          </Button>
        </div>
      ) : (
        <div className={'flex flex-wrap gap-2 items-center justify-center'}>
          {concepts.map((concept) => (
            <Chip color="primary" key={concept} className="text-xs">
              {getDisplayName(concept)}
            </Chip>
          ))}
        </div>
      )}
    </FormControl>
  )
}

export default memo(ShopConceptsField)
