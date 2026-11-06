import PortfolioImage from './PortfolioImage';

export const credentialActionClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#cea605]/40 bg-transparent px-4 py-2 text-sm text-[#f2de8c] hover:border-[#cea605] hover:shadow-[0_0_20px_rgba(206,166,5,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none';

const CredentialPreview = ({ document, showActions = true }) => {

  return (
    <figure className="group/preview space-y-4 min-w-0">
      <div className="min-h-64 rounded-2xl border border-[#725c02]/40 bg-white/[0.03] flex items-center justify-center p-4 sm:p-6 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#cea605] hover:shadow-[0_0_30px_rgba(206,166,5,0.2)] motion-reduce:transition-none">
        {document.documentUrl ? (
          <PortfolioImage src={document.documentUrl} alt={document.title} className="w-full h-auto" />
        ) : (
          <div className="w-full min-h-52" aria-label={`${document.title} preview reserved`} />
        )}
      </div>
      <figcaption className="border-l-2 border-[#cea605] pl-4 text-base text-[#d4d4d4]">
        <span className="block">{document.title}</span>
        {(document.issueDate || document.completionDate) && <span className="mt-1 block text-sm text-[#a3a3a3]">{document.issueDate ? `Issued ${document.issueDate}` : `Completed ${document.completionDate}`}</span>}
      </figcaption>
      {showActions && <div className="flex flex-wrap gap-3">
        {/* Preserve the action when a document has no independent verification URL. */}
        <a className={credentialActionClass} href={document.verifyLink || undefined} role="link" tabIndex={0} aria-disabled={!document.verifyLink} title={!document.verifyLink ? 'Verification link pending' : undefined} target="_blank" rel="noopener noreferrer">{document.verifyLabel ?? 'Verify credential'} <span aria-hidden="true">↗</span></a>
      </div>}
    </figure>
  );
};

export default CredentialPreview;
