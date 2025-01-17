import MediaQueriesService from 'ember-cli-media-queries/services/media-queries';
import { computed, set } from '@ember/object';

export default MediaQueriesService.extend({
  media: computed(()=>{return {
    xs:'(max-width: 575px)',
    sm:'(min-width: 576px) and (max-width: 767px)',
    md:'(min-width: 768px) and (max-width: 991px)',
    lg:'(min-width: 992px) and (max-width: 1999px)',
    xl:'(min-width: 1200px)',
    mobile: '(max-width: 767px)',
    desktop: '(min-width: 768px)',
    docs: '(min-width: 1050px)',
    burger: '(max-width: 450px)'
  }}),
});
