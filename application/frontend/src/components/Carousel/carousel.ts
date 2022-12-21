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

import { initGlideJsSlider, galleryHorizontalPadding, getGalleryPeek, getBreakpoint } from '../../ts/helpers/glide';
import { breakpoints } from '../../ts/constants/breakpoints';
import { getScrollbarWidth } from '../../ts/scrollbar';

const getCardsListPeek = (element, breakpoint) => {
  const minPeek = 40;
  const mobileMinPeek = 52;

  // Cards list should appear centered on mobile, otherwise it works same as gallery.
  if (breakpoint === breakpoints.sm) {
    const pagePadding = galleryHorizontalPadding[breakpoints.sm];
    const scrollbarOffset = getScrollbarWidth() / 2;

    return pagePadding + mobileMinPeek - scrollbarOffset;
  }

  return getGalleryPeek(element, breakpoint, minPeek);
};

const initCardsListGlideJs = () => {
  initGlideJsSlider('.carousel', element => {
    const breakpoint = getBreakpoint();

    return {
      type: 'slider',
      gap: 32,
      bound: true,
      rewind: false,
      peek: getCardsListPeek(element, breakpoint),
      perView: element.dataset.itemsPerRowLg,
      breakpoints: {
        [breakpoints.md]: {
          perView: element.dataset.itemsPerRowSm
        },
        [breakpoints.lg]: {
          perView: element.dataset.itemsPerRowMd
        }
      }
    };
  });
};

initCardsListGlideJs();