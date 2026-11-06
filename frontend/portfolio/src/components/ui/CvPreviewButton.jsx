import { lazy, Suspense, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useProfile } from '../../context/ProfileContext';
import { profileData } from '../../content/profileData';
import ActionButton from './ActionButton';

const CvPreviewDialog = lazy(() => import('./CvPreviewDialog'));

const CvPreviewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile();
  const name = profile?.name || profileData.name;
  const cvUrl = profile?.cvFile?.url || profileData.cvFile.url;
  const downloadUrl = cvUrl.startsWith('https://res.cloudinary.com/')
    ? cvUrl.replace('/upload/', '/upload/fl_attachment:Ahmed-Ayyad-CV/')
    : cvUrl;

  return (
    <>
      <ActionButton
        variant="outline-glow"
        onClick={() => setIsOpen(true)}
        ariaLabel="View CV in a dialog"
        className="min-h-11 font-normal text-base tracking-wide shadow-[0_0_7.5px_2.5px_rgba(206,166,5,0.125)]! hover:shadow-[0_0_12.5px_5px_rgba(206,166,5,0.25)]! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
      >
        <EyeIcon aria-hidden="true" className="size-5" />
        View CV
      </ActionButton>

      {isOpen && (
        <Suspense fallback={<p role="status" className="sr-only">Opening CV preview...</p>}>
          <CvPreviewDialog name={name} cvUrl={cvUrl} downloadUrl={downloadUrl} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default CvPreviewButton;
