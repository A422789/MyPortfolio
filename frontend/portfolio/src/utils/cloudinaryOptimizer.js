/**
 * Cloudinary Media Optimizer Utility.
 * Automatically injects responsive widths, modern formats (f_auto -> AVIF/WebP),
 * and loss-less smart compression (q_auto:good) to achieve 100/100 Lighthouse performance.
 */
export const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url;

  // Only optimize Cloudinary image URLs
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  // Do not format PDFs or raw documents
  if (url.endsWith('.pdf') || url.includes('/raw/')) {
    return url;
  }

  const { width, quality = 'auto:good', format = 'auto', crop = 'limit' } = options;

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
  ];

  if (width) {
    transformations.push(`w_${width}`);
    transformations.push(`c_${crop}`);
  }

  const transformString = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformString}/`);
};

/**
 * Generates an attachment download URL for Cloudinary PDFs/CVs
 */
export const getDownloadUrl = (url, customFileName) => {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('/upload/')) return url;
  return url.replace('/upload/', '/upload/fl_attachment/');
};
