import {calculateScore} from "../helpers/Score";

const Audit = require('lighthouse').Audit;

export = class BundleSizeReportAudit extends Audit {
    static get meta() {
        return {
            id: 'js-bundle-size-report',
            title: 'JS Bundle Size',
            description: 'The JS bundle size report compares an ideal size of 1MB against the current JS bundle size',
            failureTitle: 'The JS bundle size is big.',
                requiredArtifacts: ['BundleSizeReport'],
        };
    }

    static audit(artifacts) {
        const resources = artifacts.BundleSizeReport.scripts;

        const reducer = (acc, curr) => acc + curr.size;

        const headings = [{ key: 'url', itemType: 'url', text: 'URL' }, { key: 'size', itemType: 'numeric', text: 'Size (bytes)' }];
        const tableDetails = Audit.makeTableDetails(headings, resources);

        const totalize = resources.reduce(reducer, 0);

        return {
            score: calculateScore(totalize),
            displayValue: `${totalize} bytes`,
            numericValue: totalize,
            details: tableDetails
        };
    }
}
