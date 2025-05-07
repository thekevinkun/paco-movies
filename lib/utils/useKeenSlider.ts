import { useState } from "react";
import type { KeenSliderInstance } from "keen-slider/react";

// Type override for slides option
type SlidesOption =
| number
| {
    perView?: number | "auto" | (() => number | "auto");
    spacing?: number;
    }
| ((size: number, slides: HTMLElement[]) => {
    perView?: number | "auto";});

export const useKeenSliderWithArrows = () => {
  const [arrowDisabled, setArrowDisabled] = useState({ prev: true, next: false });

  const updateArrows = (s: KeenSliderInstance) => {
    const rel = s.track.details.rel;
    const slideCount = s.track.details.slides.length;

    let dynamicPerView = 1;
    const slidesOption = s.options?.slides as SlidesOption;

    if (typeof slidesOption === "number") {
      dynamicPerView = slidesOption;
    } else if (typeof slidesOption === "function") {
      const domSlides = Array.from(s.container.children) as HTMLElement[];
      const result = slidesOption(window.innerWidth, domSlides);
      if (typeof result.perView === "number") {
        dynamicPerView = result.perView;
      }
    } else if (
      typeof slidesOption === "object" &&
      slidesOption !== null &&
      "perView" in slidesOption
    ) {
      const perView = slidesOption.perView;
      if (typeof perView === "number") {
        dynamicPerView = perView;
      } else if (typeof perView === "function") {
        const result = perView();
        if (typeof result === "number") {
          dynamicPerView = result;
        }
      }
    }

    const atStart = rel === 0;
    const atEnd = rel >= slideCount - Math.ceil(dynamicPerView - 1);

    setArrowDisabled({ prev: atStart, next: atEnd });
  };

  return {
    arrowDisabled,
    updateArrows
  };
};