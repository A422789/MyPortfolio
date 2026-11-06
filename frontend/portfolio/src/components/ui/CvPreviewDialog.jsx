import { useRef } from 'react';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ActionButton from './ActionButton';

const CvPreviewDialog = ({ name, cvUrl, downloadUrl, onClose }) => {
  const closeButtonRef = useRef(null);

  return (
    <Dialog open onClose={onClose} initialFocus={closeButtonRef} className="relative z-[100]">
      <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <DialogPanel className="flex h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#725c02]/50 bg-black text-white shadow-2xl shadow-black/60">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 p-4 sm:px-6">
            <div className="min-w-0">
              <DialogTitle className="text-lg sm:text-xl font-normal">CV</DialogTitle>
              <p className="mt-1 truncate text-xs sm:text-sm text-[#a3a3a3]">{name}</p>
              <Description className="sr-only">Preview the current CV or download a PDF copy.</Description>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <ActionButton
                variant="outline-muted"
                href={downloadUrl}
                download="Ahmed-Ayyad-CV.pdf"
                className="min-h-11 text-xs sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
              >
                <ArrowDownTrayIcon aria-hidden="true" className="size-4" />
                Download CV
              </ActionButton>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close CV preview"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-white/15 bg-transparent text-[#d4d4d4] hover:border-[#725c02] hover:text-[#f2de8c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c]"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 bg-[#141414]">
            <iframe src={cvUrl} title={`${name} CV preview`} className="h-full w-full border-0" />
          </div>
          <p className="shrink-0 border-t border-white/10 px-4 py-3 text-xs text-[#a3a3a3] sm:px-6">
            If the preview is unavailable, use Download CV to save a PDF copy.
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CvPreviewDialog;
