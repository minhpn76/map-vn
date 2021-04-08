/**
 *
 * Asynchronously loads the component for EarnLaCo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
