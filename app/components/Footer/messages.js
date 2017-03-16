/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  year: {
    id: 'app.components.Footer.year',
    defaultMessage: '© {yearStart}',
  },
  yearsRange: {
    id: 'app.components.Footer.yearsRange',
    defaultMessage: '© {yearStart}-{yearCurrent}',
  },
});
