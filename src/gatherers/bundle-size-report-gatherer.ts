import * as lighthouse from 'lighthouse';
const Gatherer = lighthouse.Gatherer;

import * as NetworkRequest from 'lighthouse/lighthouse-core/lib/network-request';

const INLINE_PROTOCOL = 'data:';

// Cause get request content with circular request id in a request might timeout, so we add
// timeout options for getRequestContent(record.requestId, option.timeout)

const DEFAULT_OPTIONS = {
    TIMEOUT: 6000
};

export = class BundleSizeReport extends Gatherer {
    async afterPass(passContext, loadData) {
        const driver = passContext.driver;

        let sizesMapping = {scripts: [], css: []};

        const filteredLoadData = loadData.networkRecords.filter((record) => !record.sessionId)
                                .filter((record) => new URL(record.url).protocol !== INLINE_PROTOCOL);

        const jsRecords = filteredLoadData
            .filter((record) => record.resourceType === NetworkRequest.TYPES.Script);

        const cssRecords = filteredLoadData
            .filter((record) => record.resourceType === NetworkRequest.TYPES.Stylesheet);

        for (const record of jsRecords) {
            try {
                const url = encodeURIComponent(record.url);
                const content = await driver.getRequestContent(record.requestId, DEFAULT_OPTIONS.TIMEOUT);
                sizesMapping.scripts.push({
                    url,
                    size: content.length
                });
            } catch (e) {}
        }

        for (const record of cssRecords) {
            try {
                const url = encodeURIComponent(record.url);
                const content = await driver.getRequestContent(record.requestId, DEFAULT_OPTIONS.TIMEOUT);
                sizesMapping.css.push({
                    url,
                    size: content.length
                });
            } catch (e) {}
        }

        return sizesMapping;
    }
};
