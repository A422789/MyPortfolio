/**
 * Injects Cloudinary optimization transformations (modern formats WebP/AVIF, quality compression).
 * @param {string} url - Original Cloudinary URL
 * @param {string} transforms - Transformation string (default: 'f_auto,q_auto')
 * @returns {string} Optimized URL
 */
export const optimizeCloudinaryUrl = (url, transforms = 'f_auto,q_auto') => {
  if (!url || typeof url !== 'string') return url || '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('/upload/f_auto')) {
    return url.replace('/upload/', `/upload/${transforms}/`);
  }
  return url;
};
