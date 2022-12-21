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

import Glide from '@glidejs/glide';
import { breakpoints } from '../constants/breakpoints';
import { isRunningIos } from './platform';
import { throttle } from './utils';
import { Breakpoint } from '../types/types';

export const galleryHorizontalPadding: Breakpoint = {
  [breakpoints.sm]: 24,
  [breakpoints.md]: 32,
  [breakpoints.lg]: 0
};

const SLIDER_MOVING_DATA_ATTRIBUTE = 'data-slider-move';

const getBreakpoint: () => number = () => {
  let breakpoint: number = breakpoints.lg;

  if (window.innerWidth < breakpoints.md) {
    breakpoint = breakpoints.sm;
  } else if (window.innerWidth < breakpoints.lg) {
    breakpoint = breakpoints.md;
  }

  return breakpoint;
};

export const initGlideJsSlider: (selector: string, optionsFn: any) => void = (selector, optionsFn) => {
  const listener = () => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      return;
    }

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const glide: Glide = new Glide(element as HTMLElement, optionsFn(element));

      /*
       * Glide JS provides a throttled 'resize' event, so it's safe to use it here
       * without throttling/debouncing on our side.
       */
      glide.on('resize', () => {
        /*
         * Peek value depends on the current width of the window and the slider element,
         * so it needs to be updated upon resize.
         */
        const updateOptions: any = {
          peek: optionsFn(element).peek,
          startAt: 0
        };

        // Workaround for following issue: https://github.com/glidejs/glide/issues/541
        if (getBreakpoint() === breakpoints.lg) {

          updateOptions.perView = optionsFn(element).perView;
        }
        glide.update(updateOptions);
      });

      // Workaround for https://teamds.atlassian.net/browse/DW2-131
      if (isRunningIos()) {
        glide.on('swipe.move', () => {
          element.setAttribute(SLIDER_MOVING_DATA_ATTRIBUTE, 'true');
        });

        glide.on('swipe.end', () => {
          element.removeAttribute(SLIDER_MOVING_DATA_ATTRIBUTE);
        });

        /*
         * Glide.js calls stopPropagation when it starts moving slides upon 'touchmove' event,
         * so useCapture needs to be true.
         */
        element.addEventListener(
          'touchmove',
          throttle(e => {
            if (element.getAttribute(SLIDER_MOVING_DATA_ATTRIBUTE)) {
              // If slider is already moving, don't allow scrolling
              e.preventDefault();
            }
          }),
          true
        );

        /*
         * We need Glide.js's event handler to be already ran at this point, so we need useCapture to be false.
         * If Glide.js's event handler doesn't stop event propagation, it means the page is scrolling,
         * so we need to disable the slide to avoid swiping and scrolling at the same time.
         */
        element.addEventListener(
          'touchmove',
          throttle(() => {
            // If already scrolling, don't allow slider movement
            if (!element.getAttribute('data-swipe-move') && !glide.disabled) {
              glide.disable();
            }
          })
        );

        element.addEventListener(
          'touchend',
          () => {
            if (glide.disabled) {
              glide.enable();
            }
          },
          true
        );
      }

      glide.mount();
    }
  };

  window.addEventListener('load', listener, { once: true });
};
