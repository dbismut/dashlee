var DEBUG_MODE_ON = true;

if (!DEBUG_MODE_ON) {
  console = console || {};
  console.log = function () {};
}

(function (document) {
  'use strict';
  /*jslint nomen: true */
  /*global _, PolymerExpressions, SidLeeClient */

  var dashboard_;
  var client_;


  function computeData(sensor) {
    console.log(sensor);
    var sensorEl = dashboard_.$[sensor._id];
    if (sensorEl && sensorEl.tick) {
      sensorEl.tick(sensor);
    }
  }

  function initData(data) {
    document.sensorData = data;
    dashboard_.$.loader.classList.remove('loading');
    setTimeout(function() {
      dashboard_.$.loader.remove();
    }, 600);

    console.log(data);
    _.each(data, function(sensor) {
      var sensorEl = dashboard_.$[sensor._id];
      if (sensorEl && sensorEl.initSensor) {
        sensorEl.initSensor(sensor);
      } else {
        console.log('no element update for', sensor);
      }
    });
  }

  document.addEventListener('polymer-ready', function () {
    console.log('Polymer is ready to rock!');

    // Perform some behaviour
    dashboard_ = document.querySelector('#dashboard');
    PolymerExpressions.prototype.plus = function(value, i) {
      return value + i;
    };

    window.onresize = _.debounce(function() {
      dashboard_.$.fridgeDegrees.fitCanvas();
      dashboard_.$.sound.fitCanvas();
    }, 300);

    document.addEventListener('switch-event', function(event) {
      client_.postEvent({
        name:'lightswitch',
        value: event.detail.value,
        unit:'click',
        token:'b3f2ad85-a221-6fbf-19e2-9bcca6994c44'
      }, function(err) {
        if(err) {
          console.log(err);
          dashboard_.$.lightswitch.failFire(event.detail.value);
        }
      });
    });

    client_ = new SidLeeClient('https://sidlee.herokuapp.com/', computeData);
    client_.today().exec(initData);
  });

})(wrap(document));
