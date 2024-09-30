import {
  BEIGE_CHAIR_RESULTS,
  COFFEE_TABLE_RESULTS,
  ITEMS,
  QUEEN_SIZE_BED_RESULTS,
} from "./test-data";

const MOCK_BACKEND_ENABLED = false;
const MOCK_BACKEND_NO_RESULTS = false;

// must be type, not interface because in Algolia code BaseItem is defined like this:
// export declare type BaseItem = Record<string, unknown>;
// and only types in TS infer an implicit index signature
export type Page = {
  path: string;
  title: string;
  bestFragment: string;
  score: number;
};

export interface GetPagesResponse {
  items: Page[];
  executionTimeMs: number;
}

interface ApiResponse {
  took: number;
  hits: {
    hits?: Array<{
      _id: string;
      _score: number;
      _source: {
        title: string;
      };
      highlight?: {
        title?: string[];
        content?: string[];
      };
    }>;
  };
}

const SEARCH_RESULTS_COUNT = 40;
const PREDEFINED_RESULTS_COUNT = 2;

const buildUrl = (query: string, limit: number) => {
  return `/search/byQuery?size=${limit}&query=${query}`;
};

const getMockResponse = (items: Page[]) => {
  return {
    items,
    executionTimeMs: 8,
  };
};

export const getPages = async (query: string): Promise<GetPagesResponse> => {
  if (MOCK_BACKEND_ENABLED) {
    return new Promise<GetPagesResponse>((resolve) => {
      resolve(getMockResponse(MOCK_BACKEND_NO_RESULTS ? [] : ITEMS));
    });
  }

  const response = await fetch(buildUrl(query, SEARCH_RESULTS_COUNT));
  return mapToPagesResponse(response);
};

const mapToPagesResponse = async (response: Response): Promise<GetPagesResponse> => {
  const jsonResponse: ApiResponse = await response.json();
  const items: Page[] = jsonResponse.hits.hits ? jsonResponse.hits.hits.map(mapToPage) : [];
  return {
    items: items,
    executionTimeMs: jsonResponse.took
  };
}

const mapToPage = (hit: ApiResponse["hits"]["hits"][0]): Page => {
  const path = hit._id;
  const score = hit._score;
  const title = hit.highlight?.title?.[0] || hit._source.title;
  const bestFragment = hit.highlight?.content?.[0] || "";

  return {
    path,
    title,
    bestFragment,
    score
  };
};

export const getCoffeeTableResults = async () => {
  if (MOCK_BACKEND_ENABLED) {
    return new Promise<GetPagesResponse>((resolve) => {
      resolve(getMockResponse(COFFEE_TABLE_RESULTS));
    });
  }

  const response = await fetch(
    buildUrl("coffee table", PREDEFINED_RESULTS_COUNT)
  );
  return mapToPagesResponse(response);
};

export const getBeigeChairResults = async () => {
  if (MOCK_BACKEND_ENABLED) {
    return new Promise<GetPagesResponse>((resolve) => {
      resolve(getMockResponse(BEIGE_CHAIR_RESULTS));
    });
  }

  const response = await fetch(
    buildUrl("beige chair", PREDEFINED_RESULTS_COUNT)
  );
  return mapToPagesResponse(response);
};

export const getQueenSizeBedResults = async () => {
  if (MOCK_BACKEND_ENABLED) {
    return new Promise<GetPagesResponse>((resolve) => {
      resolve(getMockResponse(QUEEN_SIZE_BED_RESULTS));
    });
  }

  const response = await fetch(
    buildUrl("queen size bed", PREDEFINED_RESULTS_COUNT)
  );
  return mapToPagesResponse(response);
};
