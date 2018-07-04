recurly.configure({
    publicKey: window.recurlyConfig.publicKey, // Set this to your own public key
    style: {
      all: {
        fontFamily: 'Open Sans',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontColor: '#2c0730'
      }
    }
  });

  // When a customer hits their 'enter' key while in a field
  recurly.on('field:submit', function (event) {
    $('form').submit();
  });

  // On form submit, we stop submission to go get the token
  $('form').on('submit', function (event) {

    // Prevent the form from submitting while we retrieve the token from Recurly
    event.preventDefault();

    // Reset the errors display
    $('#errors').text('');
    $('input').removeClass('error');

    // Disable the submit button
    $('button').prop('disabled', true);

    var form = this;

    // Now we call recurly.token with the form. It goes to Recurly servers
    // to tokenize the credit card information, then injects the token into the
    // data-recurly="token" field above
    recurly.token(form, function (err, token) {

      // send any errors to the error function below
      if (err) error(err);

      // Otherwise we continue with the form submission
      else form.submit();

    });
  });

  // Reconfigure font size based on window size
  $(window).on('resize init', function (event) {
    if ($(this).width() < 600) {
      recurly.configure({
        style: {
          all: {
            fontSize: '0.9rem'
          }
        }
      });
    } else {
      recurly.configure({
        style: {
          all: {
            fontSize: '1rem'
          }
        }
      });
    }
  }).triggerHandler('init');

  // A simple error handling function to expose errors to the customer
  function error (err) {
    $('#errors').text('The following fields appear to be invalid: ' + err.fields.join(', '));
    $('button').prop('disabled', false);
    $.each(err.fields, function (i, field) {
      $('[data-recurly=' + field + ']').addClass('error');
    });
  }

  // runs some simple animations for the page
  $('body').addClass('show');