import React from 'react';
import {
  BeakerIcon,
  CircleStackIcon,
  CodeBracketIcon,
  KeyIcon,
  ServerStackIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const SKILL_ICONS = {
  testing: BeakerIcon,
  database: CircleStackIcon,
  key: KeyIcon,
  server: ServerStackIcon,
  shield: ShieldCheckIcon,
};

const SkillCard = ({ skill }) => {
  const Icon = SKILL_ICONS[skill.icon] ?? CodeBracketIcon;

  return (
    <li className="group/skill inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#cea605]/50 hover:bg-[#cea605]/[0.06] hover:shadow-[0_0_12px_rgba(206,166,5,0.12)] motion-reduce:transition-none">
      <span className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1.5 text-sm font-normal text-white leading-snug">
        {skill.brandIcons ? skill.brandIcons.map((brand, index) => (
          <React.Fragment key={brand.title}>
            {index > 0 && <span className="text-[#b3b3b3]">{skill.separator ?? '&'}</span>}
            <span className="inline-flex max-w-full items-center gap-1.5">
              <span
                aria-hidden="true"
                style={{ color: brand.color ?? undefined }}
                className={`inline-flex size-5 shrink-0 items-center justify-center p-0.5 [&>svg]:size-full [&>svg]:fill-current ${brand.lightBackground ? 'rounded-sm bg-white' : ''}`}
                dangerouslySetInnerHTML={{ __html: brand.svg }}
              />
              <span className="min-w-0">{skill.brandIcons.length > 1 ? (brand.label ?? brand.title) : skill.name}</span>
            </span>
          </React.Fragment>
        )) : <>
          <Icon aria-hidden="true" className="size-4 shrink-0 text-[#d4d4d4]" />
          <span className="min-w-0">{skill.name}</span>
        </>}
      </span>
      {skill.level !== 'Practical' && <span className="text-xs text-[#b3b3b3] border-l border-white/15 pl-2 leading-snug">{skill.level}</span>}
    </li>
  );
};

export default SkillCard;
