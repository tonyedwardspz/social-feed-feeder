'use strict';

let setupAttachmentChangeListener = () => {
  console.log('[Attachment] Setup change listener');
  app.shell.addEventListener('change', e => {
    if (e.target.id === 'attachment') {
      if (e.target.files[0]){
        displayImagePreview(e.target.files[0]);
      }
    }
  });
};

let displayImagePreview = (file) => {
  let image = readImageFile(file, (image) => {
    if (image){
      document.getElementById('image-preview').src = image;
    } else {
      document.getElementById('image-preview').src =
        'placeholder-image-not-available.jpg';
    }
  });
};

let readImageFile = (file, cb = null) => {
  try {
    var reader = new FileReader();
    reader.onload = (e) => {
      cb(e.target.result);
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.log('There was an issue getting the image', error);
    cb(null);
  }
};
