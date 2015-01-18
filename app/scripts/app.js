(function (document) {
  'use strict';
  /*jslint nomen: true */
  /*global _ */

  var dashboard_;

  document.addEventListener('polymer-ready', function () {
    // Perform some behaviour
    dashboard_ = document.querySelector('dashlee-dashboard');
    console.log('Polymer is ready to rock!');

  });

  document.addEventListener('toggleLight', function() {
    console.log('switching lights');
    document.body.classList.toggle('invert');
  });

  window.onresize = _.debounce(function() {
    dashboard_.$.degrees.fitCanvas();
  }, 300);

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
