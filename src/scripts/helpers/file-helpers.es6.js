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
  try {
    var reader = new FileReader();

    reader.onload = (e) => {
      document.getElementById('image-preview').src = e.target.result;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.log('There was an issue displaying the preview image', error);
    document.getElementById('image-preview').src =
      'placeholder-image-not-available.jpg';
  }

};
