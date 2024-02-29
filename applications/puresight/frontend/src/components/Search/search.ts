import { HTMLTemplate, autocomplete } from "@algolia/autocomplete-js";
import {
  Page,
  getBeigeChairResults,
  getCoffeeTableResults,
  getPages,
  getQueenSizeBedResults,
} from "./service";

const PATH_TO_REMOVE = "/published/puresight/pages";

const getAutocompleteItemUrl = (item: Page) => {
  return item.path.replace(PATH_TO_REMOVE, "");
};

const getItemTemplate = (html: HTMLTemplate, item: Page) => {
  return html`<a class="aa-ItemLink" href=${getAutocompleteItemUrl(item)}>
    <div class="aa-ItemContent">
      <div class="aa-ItemIcon aa-ItemIcon--alignTop">
        <svg
          aria-labelledby="title"
          viewBox="0 0 24 24"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="currentColor"
          stroke-width="2"
          class="block h-full w-auto"
          role="img"
        >
          <title id="title">Guide</title>
          <path
            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
          ></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      </div>
      <div class="aa-ItemContentBody">
        <div
          class="aa-ItemContentTitle"
          dangerouslySetInnerHTML="${{ __html: item.title }}"
        ></div>
        <div
          class="aa-ItemContentDescription"
          dangerouslySetInnerHTML="${{ __html: item.bestFragment }}"
        ></div>
      </div>
      <div class="aa-ItemActions">
        <button class="aa-ItemActionButton" type="button" title="Add to cart">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </button>
      </div>
    </div>
  </a>`;
};

autocomplete<Page>({
  container: "#autocomplete",
  placeholder: "Search...",
  detachedMediaQuery: "",
  openOnFocus: true,
  getSources({ query }) {
    return [
      {
        sourceId: "pages",
        async getItems({ query }) {
          if (query === "") {
            return [];
          }
          const pages = await getPages(query);
          return pages.items;
        },
        getItemUrl({ item }) {
          return getAutocompleteItemUrl(item);
        },
        templates: {
          item({ item, html }) {
            return getItemTemplate(html, item);
          },
          noResults:
            query === ""
              ? undefined
              : () => {
                  return "No results";
                },
        },
      },
      {
        sourceId: "coffeeTableResults",
        async getItems({ query }) {
          if (query) {
            return [];
          }

          const response = await getCoffeeTableResults();
          return response.items;
        },
        getItemUrl({ item }) {
          return getAutocompleteItemUrl(item);
        },
        templates: {
          header({ html }) {
            if (query === "") {
              return html`<span class="aa-SourceHeaderTitle"
                  >Coffee tables</span
                >
                <div class="aa-SourceHeaderLine" />`;
            }

            return null;
          },
          item({ item, html }) {
            return getItemTemplate(html, item);
          },
        },
      },
      {
        sourceId: "beigeChairResults",
        async getItems({ query }) {
          if (query) {
            return [];
          }

          const response = await getBeigeChairResults();
          return response.items;
        },
        getItemUrl({ item }) {
          return getAutocompleteItemUrl(item);
        },
        templates: {
          header({ html }) {
            if (query === "") {
              return html`<span class="aa-SourceHeaderTitle">Beige chairs</span>
                <div class="aa-SourceHeaderLine" />`;
            }

            return null;
          },
          item({ item, html }) {
            return getItemTemplate(html, item);
          },
        },
      },
      {
        sourceId: "queenSizeBedResults",
        async getItems({ query }) {
          if (query) {
            return [];
          }

          const response = await getQueenSizeBedResults();
          return response.items;
        },
        getItemUrl({ item }) {
          return getAutocompleteItemUrl(item);
        },
        templates: {
          header({ html }) {
            if (query === "") {
              return html`<span class="aa-SourceHeaderTitle"
                  >Queen size beds</span
                >
                <div class="aa-SourceHeaderLine" />`;
            }

            return null;
          },
          item({ item, html }) {
            return getItemTemplate(html, item);
          },
        },
      },
    ];
  },
});
