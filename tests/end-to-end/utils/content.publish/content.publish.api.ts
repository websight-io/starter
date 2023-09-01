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

import type { AxiosResponse } from 'axios';
import FormData from 'form-data';
import type { PageTreeItem, ResponseGetAssets, ResponseGetPagesTree } from './content.publish.types';
import { API_ACTION, CONTENT_SPACE } from './content.publish.types';
import { buildUrl, http, pathContent } from './content.publish.request';

const requestAllRootAssets = async (space: CONTENT_SPACE): Promise<AxiosResponse<ResponseGetAssets>> => {
    return await http.get<ResponseGetAssets>(buildUrl(space, API_ACTION.GET_ASSETS));
};

const getPagesTreeItem = (data: ResponseGetPagesTree, key?: string): PageTreeItem => {
    const index = key || data.entity.rootId;
    return data.entity.items[index];
}

const getAllRootAssetsNames = async (space: CONTENT_SPACE): Promise<string[]> => {
    const assets: AxiosResponse<ResponseGetAssets> = await requestAllRootAssets(space);
    return assets.data.entity.children.map(child => child.name);
}

/**
 * moves nested `childrenItems` created by `getPagesTreeRecursive` into 1D array
 */
const flattenRecursivePageTreeItem = (pageTreeItem: PageTreeItem): PageTreeItem[] => {
    let result: PageTreeItem[] = [pageTreeItem];

    if (pageTreeItem.childrenItems) {
        for (const child of pageTreeItem.childrenItems) {
            result = result.concat(flattenRecursivePageTreeItem(child));
        }
    }

    return result;
}

const flattenAllRecursivePageTreeItems = (pageTreeItems: PageTreeItem[]): PageTreeItem[] => {
    return pageTreeItems.flatMap(flattenRecursivePageTreeItem);
}

const requestPagesTree = async (space: CONTENT_SPACE, page?: string): Promise<AxiosResponse<ResponseGetPagesTree>> => {
    const action = !page
        ? API_ACTION.GET_PAGES
        : API_ACTION.GET_PAGES.replace(/pages/, `pages/${page}`);

    return await http.get(buildUrl(space, action));
}

/**
 * Decorates API `PageTreeItem` result with handy data
 * @see `export interface PageTreeItem`
 */
const getPagesTreeRecursive = async (space: CONTENT_SPACE, rootItem: PageTreeItem): Promise<PageTreeItem[]> => {
    const path = pathContent(space);

    if (!rootItem.hasChildren) {
        return Promise.resolve([]);
    }

    return Promise.all(rootItem.children.map(async (child) => {
        /**
         * @example in:  '/content/ds-website/pages/terms-of-use',
         * @example out: 'terms-of-use'
         */
        const pageTreeName: string = child.replace(`${path}pages/`, '');

        const pagesTreeResponse = await requestPagesTree(space, pageTreeName);
        const treeItem: PageTreeItem = getPagesTreeItem(pagesTreeResponse.data, child);

        const pathParts = treeItem.id.split('/');
        const pageName = pathParts.pop(); // remove all after last slash
        const parentPath = pathParts.join('/').replace(path, '');

        // decoration
        treeItem.publishAction = `${parentPath}${API_ACTION.PUBLISH_PAGES_PARTIAL}`;
        treeItem.childrenItems = await getPagesTreeRecursive(space, treeItem);
        treeItem.pageName = pageName;

        return treeItem;
    }));
}

/**
 * @example in [
 *   { id: "/content/ds-website/pages/terms-of-use" },
 *   { id: "/content/ds-website/pages/privacy-policy" },
 *   { id: "/content/ds-website/pages/privacy-policy/a" },
 *   { id: "/content/ds-website/pages/privacy-policy/a/b" },
 *   { id: "/content/ds-website/pages/privacy-policy/x" }
 * ]
 *
 * @example out [
 *   [
 *     { id: '/content/ds-website/pages/terms-of-use' },
 *     { id: '/content/ds-website/pages/privacy-policy' }
 *   ],
 *   [
 *     { id: '/content/ds-website/pages/privacy-policy/a' },
 *     { id: '/content/ds-website/pages/privacy-policy/x' }
 *   ],
 *   [
 *     { id: '/content/ds-website/pages/privacy-policy/a/b' }
 *   ]
 * ]
 */
const getPagesTreeGroupedByParent = (pages: PageTreeItem[]): PageTreeItem[][] => {
    const groups = {};

    pages.forEach(page => {
        const parentPath = page.id.substring(0, page.id.lastIndexOf('/'));

        if (groups[parentPath]) {
            groups[parentPath].push(page);
        } else {
            groups[parentPath] = [page];
        }
    });

    return Object.values(groups);
}

const requestRootPage = async (space: CONTENT_SPACE) => {
    const pagesRootResponse = await requestPagesTree(space);
    return getPagesTreeItem(pagesRootResponse.data);
}

const requestAllPages = async (space: CONTENT_SPACE) => {
    const pagesRoot = await requestRootPage(space);
    const pagesResponse: PageTreeItem[] = await getPagesTreeRecursive(space, pagesRoot)
    return flattenAllRecursivePageTreeItems(pagesResponse);
}

export const publishAllAssets = async (space: CONTENT_SPACE, assets: string[]): Promise<void> => {
    const log = `(items count: ${assets.length})`;

    if (assets.length === 0) {
        console.log('ASSET PUBLISHED', log, space, assets);
        return;
    }

    const formData = new FormData();
    assets.forEach(item => formData.append('items', item));

    try {
        await http.post<void>(buildUrl(space, API_ACTION.PUBLISH_ASSETS), formData);
        console.log('ASSET PUBLISHED', log, space, assets);
    } catch (error) {
        console.log(`ASSET PUBLISH ERROR ${log}`, space, assets);
        throw error;
    }
};

export const publishAllPages = async (space: CONTENT_SPACE, pages: PageTreeItem[]): Promise<void> => {
    const parentNodes: PageTreeItem[][] = getPagesTreeGroupedByParent(pages);

    const publishPages: Promise<AxiosResponse<void>>[] = parentNodes.flatMap(pagesGroup => {
        const publishAction = pagesGroup[0].publishAction;
        const itemsNames = pagesGroup.map(page => page.pageName);
        const formData = new FormData();

        pagesGroup.forEach(({ pageName }) => formData.append('items', pageName));

        const log = `(items count: ${pagesGroup.length})`;

        try {
            const response = http.post<void>(buildUrl(space, publishAction), formData);
            console.log(`PAGE PUBLISHED ${log}`, space, itemsNames);
            return response;
        } catch (error) {
            console.log(`PAGE PUBLISH ERROR ${log}`, space, itemsNames);
            throw error;
        }
    });

    await Promise.all(publishPages);
};

export const publishAllContent = async (space: CONTENT_SPACE) => {
    const assets: string[] = await getAllRootAssetsNames(space);
    const pages: PageTreeItem[] = await requestAllPages(space);

    return Promise.all([
        publishAllAssets(space, assets),
        publishAllPages(space, pages),
    ]);
};
