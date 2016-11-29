'use strict';

let setupAttachmentChangeListener = () => {
  console.log('[Attachment] Setup change listener');
  app.shell.addEventListener('change', e => {
    if (e.target.id === 'attachment') {
      console.log(e.target.files[0]);
      if (e.target.files[0]){
        displayImagePreview(e.target.files[0]);
      }
    }
  });
};

let displayImagePreview = (file) => {
  var reader = new FileReader();

  reader.onload = (e) => {
    document.getElementById('image-preview').src = e.target.result;
  };

  reader.readAsDataURL(file);
};
