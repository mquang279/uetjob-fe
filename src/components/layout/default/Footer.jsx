
const FOOTER_DATA = {
    logo: {
        src: "https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png",
        alt: "UETJob Logo"
    },
    aboutUs: {
        title: "About Us",
        links: ["Home", "About Us", "Contact Us", "All Jobs", "FAQ"]
    },
    terms: {
        title: "Terms & Conditions",
        links: ["Privacy Policy", "Operating Regulation", "Terms & Conditions"]
    },
    contact: {
        title: "Want to post a job? Contact us at:",
        info: [
            "Ho Chi Minh: (+84) 977 460 519",
            "Ha Noi: (+84) 983 131 351",
            "Email: love@itviec.com",
            "Submit contact information"
        ]
    }
};

const FooterSection = ({ title, items, className = "" }) => (
    <div className={`footer-section ${className} flex flex-col items-center`}>
        <h3 className="font-bold py-4 text-lg">{title}</h3>
        <ul className="space-y-2 flex-col">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="text-gray-300 text-sm font-medium hover:text-white transition-colors duration-200 cursor-pointer text-center"
                >
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const FooterLogo = ({ src, alt }) => (
    <div className="logo flex-shrink-0">
        <img
            src={src}
            alt={alt}
            className="h-auto w-50 object-contain"
            loading="lazy"
        />
    </div>
);

const Footer = () => {
    return (
        <footer className="footer w-full relative">
            {/* Azure Depths Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                }}
            />
            <div className="flex flex-col justify-between items-center gap-8 px-12 py-12 text-white relative z-10">
                <FooterLogo
                    src={FOOTER_DATA.logo.src}
                    alt={FOOTER_DATA.logo.alt}
                />

                <div className="flex flex-col md:flex-row gap-10 md:gap-20 flex-1 justify-between">
                    <FooterSection
                        title={FOOTER_DATA.aboutUs.title}
                        items={FOOTER_DATA.aboutUs.links}
                    />

                    <FooterSection
                        title={FOOTER_DATA.terms.title}
                        items={FOOTER_DATA.terms.links}
                    />

                    <FooterSection
                        title={FOOTER_DATA.contact.title}
                        items={FOOTER_DATA.contact.info}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer