const FooterLink = ({text, linkText, onSwitch}) => {
    return(
        <div className="mt-5">
            <p className="inline text-sm text-gray-500 text-center">
                {text}{" "}
            </p>
            <button
                onClick={onSwitch}
                className="text-gray-400 cursor-pointer"
            >
                {linkText}
            </button>
        </div>
    );
}

export default FooterLink;

    //   <p className="mt-4 text-sm text-gray-600 text-center">
    //     Have an account?{" "}
    //     <button
    //       onClick={onSwitch}
    //       className="text-blue-600 underline cursor-pointer">
    //       Sign In
    //     </button>
    //   </p>