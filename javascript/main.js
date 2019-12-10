(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch alle forms som skal have Bootstrap validation styles.
    let forms = document.getElementsByClassName('needs-validation');
    // Loop igennem dem og prevent submission
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();