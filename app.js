(function() {
  let elements = document.querySelectorAll('[data-tw-bind]');
  let scope = {};

  elements.forEach(
    element => {
      
      if (element.type === 'text' || element.type === 'textarea') {
        let propToBind = element.getAttribute('data-tw-bind')
        addScopeProp(propToBind);
        element.onkeyup = () => {
          scope[propToBind] = element.value;
        }
      };

      // Bind prop to elements
      function addScopeProp(prop) {
        if (!scope.hasOwnProperty(prop)) {
          let value;
          Object.defineProperty(scope, prop, {
            set: (newValue) => {
              value = newValue;
              elements.forEach((element) => {
                // change value to binded elements

                if (element.getAttribute('data-tw-bind') === prop) {
                  if (element.type && (element.type === 'text' || element.type === 'textarea')) {
                    element.value = newValue;
                  } else if (!element.type) {
                    element.innerHTML = newValue;
                  }
                }

              })
            },
            get: () => {
              return value;
            },
            enumerable: true
          })
        }
      }
    }
  );

  log = function () {
    Object.keys(scope).forEach(function (key) {
      console.log(key + ': ' + scope[key]);
    })
  }

  changeNameByCode = function () {
    scope.name = 'name Changed by Code';
  }

  changeSurnameByCode = function () {
    scope.surname = 'surname Changed by Code';
  }
})();