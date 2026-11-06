import { socialLinksData } from '../../content/socialLinksData';

const SocialIcons = () => (
  <div className="flex gap-6 max-w-md">
    {socialLinksData.map((link) => (
      <a
        key={link._id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.platform} ${link._id === 'whatsapp' ? 'Contact' : 'Profile'}`}
        className="p-5 rounded-full border border-white/15 bg-transparent hover:border-white/50 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] motion-safe:hover:scale-105 transition-[transform,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
      >
        <span
          style={{ color: link.brandColor }}
          className={`block size-7 [&>svg]:size-full [&>svg]:fill-current ${link._id === 'github' ? '[&>svg]:overflow-visible [&>svg]:stroke-white/75 [&>svg]:stroke-[0.75px] [&>svg]:[paint-order:stroke]' : ''}`}
          dangerouslySetInnerHTML={{ __html: link.iconSvg }}
        />
      </a>
    ))}
  </div>
);

export default SocialIcons;
