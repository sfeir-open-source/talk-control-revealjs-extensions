// Code from taken from https://github.com/kuroidoruido/js-libs/blob/main/libs/marked-djot-div
import { marked } from 'marked';


function isDefined<T>(x: T | null | undefined): x is T {
    return x != undefined;
}

export function markedDjotDiv(): marked.MarkedExtension {
    console.log('markedDjotDiv()');
    return {
        extensions: [
            {
                name: 'djotDiv',
                level: 'block',
                start(src) {
                    return src.match(/:::/)?.index;
                },
                tokenizer(src): DjotDivToken | undefined {
                    const match = /^:::( (\w+))?/.exec(src);
                    if (isDefined(match)) {
                        const className = match?.[2];
                        const rows = src.split('\n');
                        const nextRows = rows.slice(1);
                        const closingTokenIndex = nextRows.findIndex((row) =>
                            row.match(/^:::/),
                        );
                        const closingToken =
                            closingTokenIndex === -1
                                ? ''
                                : '\n' + nextRows[closingTokenIndex];
                        const sliceEnd =
                            closingTokenIndex === -1 ? undefined : closingTokenIndex;
                        const divContent = nextRows.slice(0, sliceEnd);
                        const rawContent = divContent.join('\n');
                        const token: DjotDivToken = {
                            type: 'djotDiv',
                            raw: `${rows[0]}\n${rawContent}${closingToken}`,
                            class: className,
                            tokens: [],
                        };
                        this.lexer.blockTokens(rawContent, token.tokens);
                        return token;
                    }
                    return undefined;
                },
                renderer(token) {
                    if (!isDjotDivToken(token)) {
                        return false;
                    }
                    const content = this.parser.parse(token.tokens);
                    if (isDefined(token.class)) {
                        return `<div class="${token.class}">\n${content}</div>\n`;
                    } else {
                        return `<div>\n${content}</div>\n`;
                    }
                },
            },
        ],
    };
}

interface DjotDivToken extends marked.Tokens.Generic {
    type: 'djotDiv';
    raw: string;
    tokens: marked.Token[];
    class: string | undefined;
}

export function isDjotDivToken(
    token: DjotDivToken | { type: unknown },
): token is DjotDivToken {
    return token.type === 'djotDiv';
}