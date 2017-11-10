import AjaxRoutine from './AjaxRoutine';
import WebRoutine from './WebRoutine';
import AuthenticationRoutine from './AuthenticationRoutine';

import axios from 'axios';

class Routine {

  constructor() {
    this.ajax = new AjaxRoutine();
    this.authentication = new AuthenticationRoutine();
    this.web = new WebRoutine();
  }

}

export default Routine;
