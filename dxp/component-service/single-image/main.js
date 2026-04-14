/**
 * Single image component intended primarily for use inside Layouts (e.g. masonry
 * grids). Renders a <figure> with an <img> and an optional <figcaption> (from alt).
 */

import Handlebars from 'handlebars';
import QGDSBundle from '@qld-gov-au/qgds-bootstrap5/handlebarsInit';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// Initialize QGDS (registers all component partials and helpers)
QGDSBundle.init(Handlebars);

// Compile the QGDS image partial
const template = Handlebars.compile('{{> image}}');

export default {
  async main({ componentContent }) {
    // Extract image and common fields from input
    const image = componentContent?.image;
    const url = image?.imageVariations?.original?.url; // required to render
    const alt = image?.alt || ''; // empty string is valid for decorative images

    // Early-exit: nothing to render if URL is missing
    if (!url) {
      return `<!-- ERR: Image not provided -->`;
    }

    // Map component data to QGDS image partial fields
    // Fields reference: node_modules/@qld-gov-au/qgds-bootstrap5/src/components/bs5/image/image.hbs
    const componentData = {
      src: url,
      alt: xssSafeContent(alt),
      caption: alt ? xssSafeContent(alt) : undefined,
      lazy: true
    };

    // Render using QGDS Handlebars partial
    return template(componentData);
  }
};
