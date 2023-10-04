/*
 * Copyright (C) 2022 Dynamic Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initGlideJsSlider, getBreakpoint } from '../../ts/helpers/glide';
import { breakpoints } from '../../ts/constants/breakpoints';

const getCardsListPeek: (breakpoint: number) => number = (breakpoint) => {
  const mobileMinPeek = 52;

  if (breakpoint === breakpoints.sm) {
    return mobileMinPeek;
  }

  return 0;
};

const initCardsListGlideJs = () => {
  initGlideJsSlider('.luna-carousel.glide', element => {
    const breakpoint = getBreakpoint();
    return {
      type: 'slider',
      gap: 32,
      bound: true,
      rewind: false,
      peek: getCardsListPeek(breakpoint),
      perView: element.dataset.itemsPerRow,
      breakpoints: {
        [breakpoints.md]: {
          perView: 1
        },
        [breakpoints.lg]: {
          perView: 3
        }
      }
    };
  });
};

initCardsListGlideJs();
