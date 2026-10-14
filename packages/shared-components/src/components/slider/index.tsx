import { Slider as HeroSlider } from "@heroui/react/slider"

const Slider = Object.assign(HeroSlider, {
  Root: HeroSlider.Root,
  Output: HeroSlider.Output,
  Track: HeroSlider.Track,
  Fill: HeroSlider.Fill,
  Thumb: HeroSlider.Thumb,
  Marks: HeroSlider.Marks,
})

export default Slider
export type { SliderProps, SliderRootProps } from "@heroui/react/slider"
