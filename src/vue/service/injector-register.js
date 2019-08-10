import injector from 'vue-inject';

import ReloadDataCCService from './reloadDataCallCenter.service'

injector.service('reloadDataCCService', function () { 
  return ReloadDataCCService
});