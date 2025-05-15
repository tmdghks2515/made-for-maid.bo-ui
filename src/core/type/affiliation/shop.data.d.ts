type ShopConcept =
  | 'SHOP_CONCEPT_MAID'
  | 'SHOP_CONCEPT_BUTLER'
  | 'SHOP_CONCEPT_ANIMAL'
  | 'SHOP_CONCEPT_SCHOOL'
  | 'SHOP_CONCEPT_DEMON'
  | 'SHOP_CONCEPT_ANGEL'
  | 'SHOP_CONCEPT_GANG'
  | 'SHOP_CONCEPT_TSUNDERE'
  | 'SHOP_CONCEPT_YANDERE'
  | 'SHOP_CONCEPT_FANTASY'
  | 'SHOP_CONCEPT_IDOL'
  | 'SHOP_CONCEPT_HOSPITAL'
  | 'SHOP_CONCEPT_GOTHIC'
  | 'SHOP_CONCEPT_BLGL'
  | 'SHOP_CONCEPT_BIG'
  | 'SHOP_CONCEPT_SMALL'
  | 'SHOP_CONCEPT_MUSCLE'
  | 'SHOP_CONCEPT_OTHER'

type SnsLinkType = 'SHOP_LINK' | 'STAFF_LINK'

type SnsType = 'INSTAGRAM' | 'X' | 'NAVER' | 'YOUTUBE' | 'TIKTOK'

type SnsLinkDTO = {
  id?: string
  shopId?: string
  staffId?: string
  linkType: SnsLinkType
  snsType: SnsType
  linkUrl: string
  displayOrder: number
}

type ShopMenuImageDTO = {
  id?: string
  shopId?: string
  imageId: string
  imageUrl: string
  displayOrder: number
}

type ShopDTO = {
  id?: string
  name: string
  contactNumber: string
  shopConcepts: ShopConcept[]
  menuImages: ShopMenuImageDTO[]
  snsLinks: SnsLinkDTO[]
  createdAt?: string
}

export { ShopDTO, SnsLinkDTO, ShopConcept, SnsLinkType, SnsType, ShopMenuImageDTO }
