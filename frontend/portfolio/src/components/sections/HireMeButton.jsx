import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * HireMeButton — rewritten without styled-components.
 * Animation via plain CSS class .hire-btn (defined in App.css).
 */
const HireMeButton = () => {
  const { version } = useTheme();

  return (
    <a href="#contact" aria-label="Scroll to contact section">
      <button
        className={`hire-btn w-full sm:w-auto ${version === 'v2' ? 'text-base' : 'text-xl'}`}
        type="button"
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={version === 'v2' ? 20 : 28}
              height={version === 'v2' ? 20 : 24}
              className="hire-btn-icon block origin-center"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>
        <span className="hire-btn-label block ml-[0.3em]">
          {version === 'v2' ? 'View Projects' : 'Hire Me'}
        </span>
      </button>
    </a>
  );
};

export default HireMeButton;
