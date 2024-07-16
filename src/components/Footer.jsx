import React from 'react'
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { GiWorld } from "react-icons/gi";
import { FaAward } from "react-icons/fa";

{/* payments icons */}
import cashOnDelivery from '../assets/images/payments icons/cash-on-delivery.png';
import visa from '../assets/images/payments icons/visa.png';
import masterCard from '../assets/images/payments icons/master-card.png';
import americaExpress from '../assets/images/payments icons/america express.png';
import discover from '../assets/images/payments icons/discover.png';
import paypal from '../assets/images/payments icons/paypal.png';
import amazonPay from '../assets/images/payments icons/amazon-pay.png';
import googlePlay from '../assets/images/social-media-icons/Google_Play_Store.webp';
import appStore from '../assets/images/social-media-icons/appstore.png';
import facebook from '../assets/images/social-media-icons/facebook.png';
import instagram from '../assets/images/social-media-icons/instagram_2111463.png';
import twitter from '../assets/images/social-media-icons/twitter_logo_icon.png'
import linkedin from '../assets/images/social-media-icons/linkedin_logo_icon.png';
import youtube from '../assets/images/social-media-icons/youtube_logo_icon.png';
import paymentIcons from '../assets/images/payments icons/download.webp'


const Footer = () => {
  return (
     <div className=''>
        <section className='p-4 mb-2 md:mb-2 lg:mb-2 bg-white text-blue-400 md:mx-8 flex justify-center items-center flex-col  md:flex-row lg:flex-row text-center gap-5 '>
                <span className='flex flex-col gap-3'>
                <GiWorld className='m-auto text-3xl '/>
                <p className='font-bold'>Worldwide shipping</p>
                <p className= "text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates debitis eos, sint porro ad possimus.</p>
                <p></p>
                </span>
                <span className='flex flex-col gap-3'>
                <FaAward className='m-auto text-3xl'/>
                <p className='font-bold'>Genuine Products</p>
                <p className= "text-gray-400">It is our mission to offer only genuine products in their original packaging.</p>
                </span>
                <span className='flex flex-col gap-3'>
                <RiSecurePaymentLine className='m-auto text-3xl'/>
                <p className='font-bold'>Safe & Secure Payments</p>
                <p className= "text-gray-400">Whether you pay on-delivery, or via our many digital payment methods, your privacy and security is of utmost importance to us. </p>
                </span>
                <span className='flex flex-col gap-3'>
                <TbTruckReturn className='m-auto text-3xl'/>
                <p className='font-bold'>Free & Easy Return</p>
                <p className= "text-gray-400">Returns and replacements are easy and free-of-charge. </p>
                </span>
        </section>
        <footer className='py-2 px-12 bg-blue-500 text-white hidden lg:block'>
            {/*main footer*/}
            <section className='navbar flex justify-between mt-8'>
                <div className="about-section">
                    <h4>About</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us </a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">System</a></li>
                    </ul>
                </div>
                <span className="Help-section">
                    <h4>Help</h4>
                    <ul>
                    <li><a href="#">Payments</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Cancellation & Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Report Infringement</a></li>
                    </ul>
                </span>
                
                <div className="Customer-Care-section">
                    <h4>Customer Service</h4>
                    <ul>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Returns & Refunds</a></li>
                    <li><a href="#">Security</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>
                
                <div className="Payment-Methods-section">
                    <h4>Payment Methods</h4>
                    <span className='grid grid-cols-4 gap-3'>
                        <img src={cashOnDelivery} alt="Cash on Delivery" />
                        <img src={visa} alt="Visa" />
                        <img src={masterCard} alt="Master Card" />
                        <img src={americaExpress} alt="America Express" />
                        <img src={discover} alt="Discover" />
                        <img src={paypal} alt="Paypal" />
                        <img src={amazonPay} alt="Amazon Pay" />
                    </span>
                    
                </div>
                
                <div className="social-media-icon flex flex-col gap-4">
                   
                    <div className="icons flex gap-2 flex-col">
                        <h4>Follow Us</h4>
                         <span className='flex gap-2'>
                            <img src={facebook} alt="Facebook" />
                            <img src={instagram} alt="Instagram" />
                            <img src={twitter} alt="Twitter" />
                            <img src={linkedin} alt="LinkedIn" />
                            <img src={youtube} alt="YouTube" />
                         </span>
                    </div>
                    
                    <div className="Apps-download-section">
                        <h4>Download Now</h4>
                         <span className='flex gap-2'>
                            <img src={googlePlay} alt="Google Play Store" className='w-24'/>
                            <img src={appStore} alt="App Store" className='w-24'/>
                         </span>
                    </div>
                </div>
            </section>
            <div className="pt-4 text-right">
                    &copy; 2024 All Rights Reserved by Electro-mart.com
            </div>
        </footer>

        {/* footer for mobile*/}
        <footer className='mb-16 sm:mb-0 bg-white py-3 md:mx-8 lg:hidden'>
            <span>
                <ul className='flex gap-2 text-xs md:text-md justify-center items-center text-blue-500 font-semibold'>
                    <li>About Us |</li>
                    <li>Contact Us |</li>
                    <li>Privacy Policy |</li>
                    <li>T&Cs |</li>
                    <li>Help Center </li>
                </ul>
            </span>
             <span className='flex justify-between items-center px-4 pt-4 flex-col gap-2 sm:flex-row'>
                <p className='text-xs text-center'>&copy; 2024 All Rights Reserved by Electro-mart.com</p>
                <img src={paymentIcons} alt="" className='w-48 h-4' />
             </span>
        </footer>
    </div>
  )
}

export default Footer