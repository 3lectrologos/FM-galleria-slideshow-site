export type ImageData = {
  name: string
  year: number
  description: string
  source: string
  artist: {
    image: string
    name: string
  }
  images: {
    thumbnail: string
    hero: {
      small: string
      large: string
    }
    gallery: string
  }
  sizes: {
    thumbnail: {
      width: number
      height: number
    }
    gallery: {
      width: number
      height: number
    }
  }
}

export type AllowedColumns = 0 | 1 | 2 | 4
