'use client'

import { ShopDTO, SnsLinkDTO, SnsType } from '@/core/type/affiliation/shop.data'
import { memo, SetStateAction, useCallback, useMemo } from 'react'
import { FormLabel, IconButton } from '@mui/joy'
import Add from '@mui/icons-material/Add'
import useCode from '@/hook/useCode'
import SnsLinkItem from '@/app/(auth)/signup/shop-info/_component/SnsLinkItem'
import * as React from 'react'
import { FormikErrors } from 'formik/dist/types'

type Props = {
  snsLinks: SnsLinkDTO[]
  setValues: (
    values: SetStateAction<ShopDTO>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<ShopDTO>>
}

const ShopSnsLinksField = ({ snsLinks, setValues }: Props) => {
  const { makeOptions } = useCode()

  const snsTypeOptions = useMemo(() => makeOptions('SNS_TYPE'), [makeOptions])

  const handleChangeSnsType = useCallback(
    (value: SnsType | null, index: number) => {
      setValues((prevState) => ({
        ...prevState,
        snsLinks: prevState.snsLinks.map((it) =>
          it.displayOrder === index ? ({ ...it, snsType: value } as SnsLinkDTO) : it,
        ),
      }))
    },
    [setValues],
  )

  const handleChangeLinkUrl = useCallback(
    (value: string, index: number) => {
      setValues((prevState) => ({
        ...prevState,
        snsLinks: prevState.snsLinks.map((it) =>
          it.displayOrder === index ? ({ ...it, linkUrl: value } as SnsLinkDTO) : it,
        ),
      }))
    },
    [setValues],
  )

  const handleAdd = useCallback(() => {
    setValues((prevState) => ({
      ...prevState,
      snsLinks: [
        ...prevState.snsLinks,
        {
          linkType: 'SHOP_LINK',
          snsType: 'INSTAGRAM',
          linkUrl: '',
          displayOrder: prevState.snsLinks.length,
        },
      ],
    }))
  }, [setValues])

  const handleRemove = useCallback(
    (index: number) => {
      setValues((prevState) => ({
        ...prevState,
        snsLinks: prevState.snsLinks
          .filter((_, i) => i !== index)
          .map((it, i) => ({
            ...it,
            displayOrder: i,
          })),
      }))
    },
    [setValues],
  )

  return (
    <>
      <div className="flex justify-between items-baseline">
        <FormLabel>업체 SNS 링크</FormLabel>
        <IconButton size="sm" onClick={handleAdd}>
          <Add fontSize="small" />
        </IconButton>
      </div>
      {snsLinks.map((snsLink, index) => (
        <SnsLinkItem
          key={`snslink-${index}`}
          snsLink={snsLink}
          index={index}
          onChangeSnsType={handleChangeSnsType}
          onChangeLinkUrl={handleChangeLinkUrl}
          snsTypeOptions={snsTypeOptions}
          onRemove={handleRemove}
        />
      ))}
    </>
  )
}

export default memo(ShopSnsLinksField)
