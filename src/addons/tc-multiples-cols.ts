/**
 * Manage multiple columns by removing the stack class
 *
 * First pass to help revealJS doing magic
 */
export function manageMultiplesColumns() {
    const allSlides = [
        ...document.querySelectorAll(
            '.reveal .slides > section.tc-multiple-columns'
        ),
    ];
    for (let i = 0; i < allSlides.length; i++) {
        const slide = allSlides[i];
        slide.classList.remove('stack');
        const cols = [...slide.querySelectorAll('.tc-col-section')];
        for (let j = 0; j < cols.length; j++) {
            const col = cols[j];
            col.removeAttribute('aria-hidden');
            col.removeAttribute('hidden');
            col.classList.remove('future');
            (col as HTMLElement).style.display = 'block';
        }
    }
}
/**
 * Final pass that set the correct background images
 */
export function postManageMultiplesColumns() {
    // We have to scan all sections to preserve revealJS background configuration and after applying the right bg content
    const allSlides = [
        ...document.querySelectorAll(
            '.reveal .slides > section.tc-multiple-columns'
        ),
    ];
    const allColsSection = []; // We preserve all section to remove them later
    for (let i = 0; i < allSlides.length; i++) {
        const slide = allSlides[i];
        slide.classList.remove('stack');
        const cols = [...slide.querySelectorAll('.tc-col-section')];
        allColsSection.push(...cols);
    }

    // We parse all reveal backgrounds that match to attach the correct image content if needed
    const allBackground = [
        ...document.querySelectorAll(
            '.reveal .backgrounds > .tc-multiple-columns > .tc-col-section'
        ),
    ];
    let indexSectionCol = 0;

    for (const background of allBackground) {
        const section = allColsSection[indexSectionCol];
        if (!background.hasAttribute('data-loaded')) {
            //RevealJS attribute to avoid double job
            background.setAttribute('data-loaded', 'true');
            const backgroundContent = background.querySelector(
                '.slide-background-content'
            );
            revealJSBackgroundImageCopiedCode(
                backgroundContent as HTMLElement,
                section as HTMLElement
            );
        }
        indexSectionCol++;
    }

    for (const colSection of allColsSection) {
        colSection.setAttribute('data-slide-to-remove', 'true');
        colSection.remove(); // We remove the section in order to avoid strange behaviour with fragment or verticals slides
    }
}

/**
 * REVEALJS COPY PASSED CODE
 *            | |
 *            | |
 *             v
 */

const revealJSBackgroundImageCopiedCode = (
    background: HTMLElement,
    section: HTMLElement
) => {
    // Copy from here : https://github.com/hakimel/reveal.js/blob/5412639a54d5631dae806ed59c4ec657cb5aba27/js/controllers/slidecontent.js#L51
    const backgroundImage = section.getAttribute('data-background-image');

    // Images
    if (backgroundImage) {
        // base64
        if (/^data:/.test(backgroundImage.trim())) {
            (background as HTMLElement).style.backgroundImage =
                `url(${backgroundImage.trim()})`;
        }
        // URL(s)
        else {
            (background as HTMLElement).style.backgroundImage = backgroundImage
                .split(',')
                .map((background) => {
                    // Decode URL(s) that are already encoded first
                    const decoded = decodeURI(background.trim());
                    return `url(${encodeRFC3986URI(decoded)})`;
                })
                .join(',');
        }
    }
};

const encodeRFC3986URI = (url = '') => {
    return encodeURI(url)
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']')
        .replace(
            /[!'()*]/g,
            (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
        );
};
