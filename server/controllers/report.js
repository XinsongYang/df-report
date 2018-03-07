const fs = require('fs');
const APIError = require('../middlewares/response').APIError;

function report(text) {
    const reportLines = [];
    const errorLines = [];
    const lines = text.split('\n');
    lines.shift();
    for (let line of lines) {
        try {
            const fields = line.split(/\s+/);
            if (fields.length !== 6) {
                continue;
            }
            const used = Number(fields[4].slice(0,-1));
            const available = Number(fields[3]);
            if (used > 75 && available < 3 * 1024 * 1024) {
                reportLines.push(line);
            }
        } catch (error) {
            console.log(error);
            errorLines.push(line);
        }
    }
    return {reportLines}
}

module.exports = {

    async text(ctx, next) {
        const { text } = ctx.request.body;
        ctx.ok(report(text));
    },

    async file(ctx, next) {
        const file = ctx.request.body.files.file || null;
        if (!file) {
            throw new APIError('file:file_not_exist', 'File not exist!');
        }
        const typeReg = /^text/;
        if (!typeReg.test(file.type)) {
            throw new APIError('file:type_not_correct', 'Type not correct!');
        }
        if (file.size / 1024 / 1024 > 2) {
            throw new APIError('file:size_too_large', 'Size too large!');
        }

        const data = fs.readFileSync(file.path);
        const text = data.toString();
        ctx.ok(report(text));
    }

}