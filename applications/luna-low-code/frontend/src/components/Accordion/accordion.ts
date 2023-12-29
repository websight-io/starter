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

const accordionItemClass = 'accordion__item';
const accordionButtonClass = 'accordion__item-header';
const openedClass = 'opened';

const handleAccordionOpening: (accordionItem: Element) => void = (accordionItem) => {
  const accordionButton: Element = accordionItem.querySelector(`.${accordionButtonClass}`);

  accordionButton.addEventListener('click', () => {
    accordionItem.classList.toggle(openedClass);
    accordionButton.ariaExpanded = accordionItem.classList.contains(openedClass)
      ? 'true'
      : 'false';
  });
};

const initAccordion: () => void = () => {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      const elements: NodeListOf<Element> = document.querySelectorAll(`.${accordionItemClass}`);

      if (!elements?.length) {
        return;
      }

      elements.forEach((accordionItem) => handleAccordionOpening(accordionItem));
    },
    { once: true }
  );
};

initAccordion();
