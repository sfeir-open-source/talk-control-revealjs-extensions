import { PluginFunction } from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import { RevealMarkdownPlugin } from './models';
import { markedDjotDiv } from './marked/marked-speaker';

// A wrapper around RevealMarkdown to add custom marked extensions
const RevealTalkControlMarkdownPlugin: PluginFunction = () => {
    const revealMarkdownPlugin: RevealMarkdownPlugin = RevealMarkdown() as unknown as RevealMarkdownPlugin;
    revealMarkdownPlugin.marked.use(markedDjotDiv());

    return {
        id: 'talk-control-markdown',
        init(reveal) {
            if (revealMarkdownPlugin && (revealMarkdownPlugin as RevealMarkdownPlugin).init) {
                return (revealMarkdownPlugin as RevealMarkdownPlugin).init(reveal);
            }
        },
        // Re-expose the same api as RevealMarkdown
        processSlides: revealMarkdownPlugin.processSlides,
        convertSlides: revealMarkdownPlugin.convertSlides,
        slidify: revealMarkdownPlugin.slidify,
        marked: revealMarkdownPlugin.marked
    };
};

export default RevealTalkControlMarkdownPlugin;
