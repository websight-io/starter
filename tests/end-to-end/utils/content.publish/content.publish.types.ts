/*
 * Copyright (C) 2023 Dynamic Solutions
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

export type PAGE_TREE_ITEMS = Record<string, PageTreeItem>;

export const API_ACTION = {
    PUBLISH_PAGES_PARTIAL: '.websight-pages-space-service.publish-pages.action',
    PUBLISH_ASSETS: 'assets.websight-assets-space-service.publish-assets.action',
    GET_PAGES: 'pages.websight-pages-space-service.get-pages-tree.action',
    GET_ASSETS: 'assets.websight-assets-space-service.get-resource-data.action?nameFilter=',
}

export enum CONTENT_SPACE {
    VISUAL_TESTS = 'luna-visual-tests',
}

export interface ResponseGetAssets {
    entity: {
        children: {
            name: string
        }[]
    }
}

export interface ResponseGetPagesTree {
    entity: {
        // example: "/content/websight-io/pages",
        rootId: string,
        items: PAGE_TREE_ITEMS
    }
}

/**
 * @see optional properties are decorated with `getPagesTreeRecursive`
 */
export interface PageTreeItem {
    hasChildren: boolean,
    // example: "/content/websight-io/pages/about-us"
    id: string,
    // example: "/content/websight-io/pages/blog/2023-conference-schedule"
    children: string[],

    childrenItems?: PageTreeItem[], // decorated by this project
    publishAction?: string, // decorated by this project
    pageName?: string, // decorated by this project
}
