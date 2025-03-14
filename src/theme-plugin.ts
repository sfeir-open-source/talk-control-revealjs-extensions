import Reveal, { PluginFunction } from 'reveal.js';
import {
    TcCustomBackgroundMap,
    TcCustomBackgroundOptions,
    customBackgrounds,
} from './addons/tc-custom-background';
import { manageMultiplesColumns } from './addons/tc-multiples-cols';
import { manageShowTypeContent } from './addons/tc-data-type';
import { transformListFragment } from './addons/tc-list-fragment';

/**
 * Default mapping to use for background
 * Key is a class style of section
 * Value is the applied background
 */
const backgroundMapping = {
    'quote-slide': 'var(--tc-quote-slide-bg-color)',
};
export interface TalkControlPluginOptions {
    tcCustomBackgroundOptions: TcCustomBackgroundOptions;
    defaultSlidesType?: string;
}
export class TalkControlTheme {
    path: string = '';
    urlParams: URLSearchParams;
    slidesElement: HTMLElement | null;
    options: TalkControlPluginOptions;

    private optionsCustomBackground: TcCustomBackgroundOptions;

    constructor(options: TalkControlPluginOptions) {
        this.options = options;
        this.path = '';

        const queryString = window.location.search;
        this.urlParams = new URLSearchParams(queryString);

        this.optionsCustomBackground = _processBackgroundThemeOptions(
            options.tcCustomBackgroundOptions
        );

        this.slidesElement = document.querySelector('.reveal .slides');
        if (!this.slidesElement) return;
    }

    postprocess() {
        this.path = this.extractPath();

        Reveal.addEventListener('ready', () => {
            manageMultiplesColumns();
            transformListFragment();
            customBackgrounds(this.optionsCustomBackground);
            manageShowTypeContent(this.options.defaultSlidesType);
        });
    }

    private extractPath() {
        const links = document.getElementsByTagName('link');

        for (let idx = 0; idx < links.length; idx++) {
            const link = links.item(idx);

            if (link?.href?.match(/talk-control-reavealjs-theme\.css$/)) {
                const path = link.href;
                return path.substring(
                    0,
                    path.indexOf('css/talk-control-reavealjs-theme.css')
                );
            }
        }
        return '';
    }
}
/**
 * Override function that prioritize the mapping offered in parameters
 * and apply default background includes in theme (quote, ...)
 * @param backgroundOptions
 * @returns
 */
function _processBackgroundThemeOptions(
    backgroundOptions: TcCustomBackgroundOptions
): TcCustomBackgroundOptions {
    const saveMapThemeBg = new Map<string, TcCustomBackgroundMap>();

    const overrideMapBackground = (theme?: string) => {
        const themeToUse = theme ?? 'default';
        if (saveMapThemeBg.has(themeToUse)) {
            return saveMapThemeBg.get(themeToUse)!;
        } else {
            const givenBackgroundOptions =
                backgroundOptions.mapBackgrounds(themeToUse);
            const applyBackgroundOptions: TcCustomBackgroundMap = {
                ...backgroundMapping,
            };
            for (const [key, value] of Object.entries(givenBackgroundOptions)) {
                applyBackgroundOptions[key] = value;
            }
            saveMapThemeBg.set(themeToUse, applyBackgroundOptions);
            return applyBackgroundOptions;
        }
    };
    return {
        ...backgroundOptions,
        mapBackgrounds: overrideMapBackground,
    };
}

const RevealTalkControlThemePlugin: (
    options: TalkControlPluginOptions
) => PluginFunction = (options: TalkControlPluginOptions) => {
    const savedOptions = options;
    return () => {
        return {
            id: 'talk-control-theme',
            init() {
                const talkControlTheme = new TalkControlTheme(savedOptions);
                talkControlTheme.postprocess();
            },
        };
    };
};
export default RevealTalkControlThemePlugin;

// Add conditionnal export for test
export const _internals =
    typeof process !== 'undefined' && process?.env?.NODE_ENV === 'test'
        ? {
              _processBackgroundThemeOptions,
          }
        : undefined;
