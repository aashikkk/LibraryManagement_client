"use client";

import { Footer } from "flowbite-react";
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from "react-icons/bs";

function FooterBar() {
    return (
        <Footer>
            <div className="w-full p-10 text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                {/* <Footer.Divider /> */}
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="/"
                        by="Online Library"
                        year={2024}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                            href="https://www.facebook.com"
                            icon={BsFacebook}
                        />
                        <Footer.Icon
                            href="https://www.instagram.com"
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            href="https://www.twitter.com"
                            icon={BsTwitter}
                        />
                        <Footer.Icon
                            href="https://www.github.com"
                            icon={BsGithub}
                        />
                        <Footer.Icon
                            href="https://www.dribbble.com"
                            icon={BsDribbble}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default FooterBar;
