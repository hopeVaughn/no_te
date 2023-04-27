// These are utility functions that can be used for managing cookies in a web application. The setCookie function sets a cookie with a given name, value, and expiration period (in days), while the getCookie function retrieves the value of a cookie with a given name. If the cookie does not exist, getCookie returns null.

export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  // Check if 'days' parameter is passed in
  if (days) {
    const date = new Date();
    // Set the time for when the cookie should expire.
    // This is done by taking the current time (in milliseconds) and adding the equivalent of 'days' in milliseconds.
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // Convert the expiration date to a string in the UTC string format
    expires = '; expires=' + date.toUTCString();
  }
  // Set the cookie with the name, value and expiration date.
  // If 'value' is falsy (e.g., undefined, null), it's converted to an empty string.
  // The path is set to the root path ('/') so the cookie is accessible across the entire site.
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name: string) {
  // Append '; ' to the start of the document.cookie string. This helps to avoid issues where the name of the cookie we want is a substring of another cookie's name.
  const value = '; ' + document.cookie;
  // Split the string into parts using the cookie name and '=' as the separator.
  // This will create an array where the first element contains everything before the cookie we're looking for, and the second element (if it exists) contains everything after.
  const parts = value.split('; ' + name + '=');
  // If the cookie exists, the 'parts' array will have 2 elements.
  if (parts.length === 2) {
    // The second part of the array (parts.pop()) will start with the cookie value and end with ';'.
    // Split this string again with ';' as the separator, and return the first element of the resulting array, which is the cookie value.
    return parts.pop()?.split(';').shift();
  }
  // If the 'parts' array doesn't have 2 elements, it means the cookie doesn't exist, so return null.
  return null;
}