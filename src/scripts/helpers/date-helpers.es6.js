// Convert passed date string into a locale object if supported, else
// return constructed version.
function convertDateToLocale(date) {
  try {
    return new Date(date).toLocaleDateString('en-GB');
  } catch (e) {
    console.log('Error converting date - Trying backup: ' + e);
    let dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  }
}
