const HireMeButton = () => (
  <a href="#contact">
    <button
      type="button"
      className="hire-me-btn w-full font-sans text-[20px] font-semibold tracking-[1.2px] bg-transparent text-[#cea605] py-[0.7em] px-[1em] pl-[0.9em] flex items-center border-2 border-[#cea605] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_15px_7px_rgba(206,166,5,0.3)]"
    >
      <div className="svg-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={40}
          height={24}
          className="block origin-center"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
          />
        </svg>
      </div>
      <span className="block ml-[0.3em]">Hire Me</span>
    </button>
  </a>
);

export default HireMeButton;

