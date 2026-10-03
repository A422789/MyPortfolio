/**
 * Injects Cloudinary optimization transformations (modern formats WebP/AVIF, quality compression).
 * Supports options as an object (e.g. { width: 700 }) or string ('f_auto,q_auto').
 * @param {string} url - Original Cloudinary URL
 * @param {string|object} options - Options or transforms string
 * @returns {string} Optimized URL
 */
export const optimizeCloudinaryUrl = (url, options = 'f_auto,q_auto') => {
  if (!url || typeof url !== 'string') return url || '';

  let transforms = typeof options === 'string' ? options : 'f_auto,q_auto';
  if (typeof options === 'object' && options !== null) {
    const parts = ['f_auto', 'q_auto'];
    if (options.width) parts.push(`w_${options.width}`);
    transforms = parts.join(',');
  }

  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('/upload/f_auto')) {
    return url.replace('/upload/', `/upload/${transforms}/`);
  }
  return url;
};

export default optimizeCloudinaryUrl;
