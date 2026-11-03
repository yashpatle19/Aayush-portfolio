(() => {
  const form = document.querySelector('#inquiry-form');
  if (!form) return;

  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton?.querySelector('span');
  const endpoint = (window.SITE_CONFIG || {}).formEndpoint || '';
  let isSubmitting = false;

  const getErrorMessage = field => {
    if (field.validity.valueMissing) {
      return field.type === 'checkbox' ? 'Please confirm the privacy notice.' : field.tagName === 'SELECT' ? 'Choose an option.' : 'This field is required.';
    }
    if (field.validity.typeMismatch && field.type === 'email') return 'Enter a valid email address.';
    if (field.validity.typeMismatch && field.type === 'url') return 'Enter a full URL, including https://.';
    return '';
  };

  const setFieldError = (field, message) => {
    const label = field.closest('label');
    if (!label) return;
    field.id ||= `${field.name}-field`;
    const errorId = `${field.id}-error`;
    let error = document.getElementById(errorId);
    if (!error) {
      error = document.createElement('span');
      error.className = 'field-error';
      error.id = errorId;
      label.append(error);
    }
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(errorId);
    field.setAttribute('aria-describedby', [...describedBy].join(' '));
  };

  const clearFieldError = field => {
    field.removeAttribute('aria-invalid');
    const errorId = `${field.id}-error`;
    document.getElementById(errorId)?.remove();
    const describedBy = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(id => id && id !== errorId);
    if (describedBy.length) field.setAttribute('aria-describedby', describedBy.join(' '));
    else field.removeAttribute('aria-describedby');
  };

  const clearAllFieldErrors = () => {
    form.querySelectorAll('[aria-invalid="true"]').forEach(clearFieldError);
  };

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const message = getErrorMessage(field);
      if (message && (field.required || field.value.trim())) setFieldError(field, message);
    });
    field.addEventListener('input', () => {
      if (field.validity.valid) clearFieldError(field);
    });
    field.addEventListener('change', () => {
      if (field.validity.valid) clearFieldError(field);
    });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (isSubmitting || !status || !submitButton) return;
    status.className = 'form-status';
    clearAllFieldErrors();

    const honeypot = form.elements.namedItem('company_website');
    if (honeypot?.value.trim()) {
      status.textContent = 'We could not process this inquiry. Please review the form and try again.';
      status.classList.add('error');
      return;
    }

    const invalidFields = [...form.elements].filter(field => field.willValidate && !field.validity.valid);
    invalidFields.forEach(field => setFieldError(field, getErrorMessage(field)));
    if (invalidFields.length) {
      status.textContent = `Please correct ${invalidFields.length === 1 ? 'the highlighted field' : 'the highlighted fields'} before sending.`;
      status.classList.add('error');
      invalidFields[0].focus();
      return;
    }

    if (!endpoint || !/^https:\/\/formspree\.io\/f\/[\w-]+$/i.test(endpoint)) {
      status.textContent = 'The inquiry form is not connected yet. To receive submissions, configure a valid Formspree endpoint in js/config.js.';
      status.classList.add('error');
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    if (submitLabel) submitLabel.textContent = 'Sending…';
    status.textContent = 'Sending your inquiry…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`Submission failed with status ${response.status}.`);
      form.reset();
      clearAllFieldErrors();
      status.textContent = 'Thank you. Your inquiry was sent successfully.';
      status.classList.add('success');
    } catch {
      status.textContent = 'Your inquiry could not be sent. Please try again later or email ayushrahangdale90091@gmail.com.';
      status.classList.add('error');
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
      if (submitLabel) submitLabel.textContent = 'Send inquiry';
    }
  });
})();
