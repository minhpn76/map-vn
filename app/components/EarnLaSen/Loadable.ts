/**
 *
 * Asynchronously loads the component for EarnLaSen
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
