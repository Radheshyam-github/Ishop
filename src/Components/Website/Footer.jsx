import React from 'react';
import Contact from '../../Components/Website/Contact';
const Footer = () => {
    const Infomation = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const Service = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const Extras = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const MyAccount = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const UserfulLinks = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const OurOffers = [
        "About Us",
        "Information",
        "Privacy Policy",
        "Terms & Conditions"
    ];
    const contact = [
        {
            img: "images/ishops.svg",
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever.Since the 1500s, when an unknown printer'
        },
        {

            title: 'Follow Us',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever.Since the 1500s, when an unknown printer'
        },
        {

            title: 'Contact Us',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever.Since the 1500s, when an unknown printer'
        },
        // Add more help items as needed
    ];

    return (
        <>
            <div className="container-fulid shadow-2xl mt-6 ">
                <div className="container justify-center lg:justify-between lg:w-auto flex flex-wrap gap-[45px] font-proxima-nova text-base leading-6 ">

                    {
                        contact.map(
                            (contact, index) => (
                                <Contact key={index} title={contact.title} img={contact.img} description={contact.description} />
                            )
                        )
                    }
                </div>
            </div>
            <div className='container-fulid shadow-2xl mt-6 bg-[#5D656B] text-white'>
                <div className='container flex flex-wrap justify-center  lg:justify-between gap-4 lg:gap-8 py-8'>
                    <div className='sm:justify-center lg:w-auto'>
                        <h3 className='font-bold'>Infomation</h3>
                        <ul className='mt-2'>
                            {
                                Infomation.map(
                                    (link, index) => (
                                        <li key={index} className='mb-2'>{link}</li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    <div className=' lg:w-auto'>
                        <h3 className='font-bold'>Service</h3>
                        <ul className='mt-2'>
                            {Service.map((link, index) => (
                                <li key={index} className='mb-2'>{link}</li>
                            ))}
                        </ul>
                    </div>
                    <div className=' lg:w-auto'>
                        <h3 className='font-bold'>Extras</h3>
                        <ul className='mt-2'>
                            {Extras.map((link, index) => (
                                <li key={index} className='mb-2'>{link}</li>
                            ))}
                        </ul>
                    </div>
                    <div className=' lg:w-auto'>
                        <h3 className='font-bold'>My Account</h3>
                        <ul className='mt-2'>
                            {MyAccount.map((link, index) => (
                                <li key={index} className='mb-2'>{link}</li>
                            ))}
                        </ul>
                    </div>
                    <div className=' lg:w-auto'>
                        <h3 className='font-bold'>Userful Links</h3>
                        <ul className='mt-2'>
                            {
                                UserfulLinks.map(
                                    (link, index) => (
                                        <li key={index} className='mb-2'>{link}</li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    <div className=' lg:w-auto'>
                        <h3 className='font-bold'>Our Offers</h3>
                        <ul className='mt-2'>
                            {OurOffers.map((link, index) => (
                                <li key={index} className='mb-2'>{link}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Footer;
