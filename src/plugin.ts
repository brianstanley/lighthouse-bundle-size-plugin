import * as path from 'path';

function resolve(loc: string): string {
    return path.join(__dirname, './', loc);
}

const plugin = {
    audits: [{path:resolve('/audits/js-bundle-size-report-audit')}, {path:resolve('/audits/css-bundle-size-report-audit')}],
    category: {
        title: 'Bundle Size',
        auditRefs: [
            {id: 'js-bundle-size-report', weight: 1},
            {id: 'css-bundle-size-report', weight: 1},
        ]
    }
};

export = plugin;