import {calculateScore} from "../helpers/Score";

const Audit = require('lighthouse').Audit;

export = class BundleSizeReportAudit extends Audit {
    static get meta() {
        return {
            id: 'css-bundle-size-report',
            title: 'CSS Bundle Size',
            description: 'The CSS bundle size report compares an ideal size of 1MB against the current CSS bundle size',
            failureTitle: 'The CSS bundle size is big.',
                requiredArtifacts: ['BundleSizeReport'],
        };
    }

    static audit(artifacts) {
        const resources = artifacts.BundleSizeReport.css;

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
