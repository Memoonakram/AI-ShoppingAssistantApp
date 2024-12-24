import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./assets/fonts/iconfonts/font-awesome/stylesheet.css"
import "./assets/fonts/webfonts/inter/stylesheet.css"
import "./assets/fonts/webfonts/public-sans/stylesheet.css"
import "./assets/css/vendors/swiper-bundle.min.css"
import "./assets/css/vendors/jos.css"
import "./assets/css/vendors/menu.css"
import "./assets/css/custom.css"
import "./assets/css/style.css"

import SizeYami_Light from "./assets/img/SizeYami_Light.png"
import Hero_Img from "./assets/img/th-14/hero-img.jpg"
import Features_img_1 from "./assets/img/th-14/features-img-1.png"
import Features_img_2 from "./assets/img/th-14/features-img-2.png"
import Features_img_3 from "./assets/img/th-14/features-img-3.png"
import Icon_Honey_Suckle_Star from "./assets/img/icons/icon-honey-suckle-star-of-life.svg"
import Home_14_Hero_Shape from "./assets/img/elements/home-14-hero-shape.svg"
import Home14_Footer_Shape from "./assets/img/elements/home-14-footer-shape.svg"
import { AuthContext } from "../services/AuthService";
import { apiService } from "../services/ApiService";
import { avatars2 } from "../../static/images/avater/avatar";
import { motion, AnimatePresence } from "framer-motion";

export const LandingPage = ({ isLoggedIn }) => {
    const api = apiService();
    const [profileAvatar, setProfileAvatar] = useState(avatars2['B']);
    const { user } = useContext(AuthContext);
    const [faqs, setFaqs] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const scrollToContact = () => {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" });
        }
      };

    useEffect(() => {
        if (user) {
            setProfileAvatar(avatars2[user.profile?.profile_pic]);
        }
    }, [user]);

    useEffect(() => {
        const getFaqs = async () => {
            const res = await api.getFaqs();
            const sortedFaqs = res.sort((a, b) => a.priority - b.priority);
            setFaqs(sortedFaqs);
        };
        getFaqs();
    }, []);

    // Toggle the FAQ visibility by index
    const toggleFaq = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Collapse if already expanded, otherwise expand
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm({ ...contactForm, [name]: value });
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const res = await api.createContact(contactForm);
        if (res.id) {
            setContactForm({
                name: '',
                email: '',
                message: ''
            });
        }
    }

    return (
        <div className='homepage'>
            <div className="page-wrapper relative z-[1] bg-white">
                {/* <!--...::: Header Start :::... --> */}
                <header className="site-header site-header--absolute is--white py-3" id="sticky-menu">
                    <div className="container-default">
                        <div className="flex items-center justify-between gap-x-8">
                            {/* <!-- Header Logo --> */}
                            <Link to="/">
                                <img src={SizeYami_Light} alt="SizeYami" width="109" height="24" />
                            </Link>
                            {/* <!-- Header Logo --> */}

                            {/* <!-- Header Navigation --> */}
                            <div className="menu-block-wrapper">
                                <div className="menu-overlay"></div>
                                <nav className="menu-block" id="append-menu-header">
                                    <div className="mobile-menu-head">
                                        <div className="go-back">
                                            <i className="fa-solid fa-angle-left"></i>
                                        </div>
                                        <div className="current-menu-title"></div>
                                        <div className="mobile-menu-close">&times;</div>
                                    </div>
                                </nav>
                            </div>
                            {/* <!-- Header Navigation --> */}

                            {/* <!-- Header User Event --> */}

                            <div className="flex items-center gap-6">
                                {isLoggedIn ?
                                    <>
                                        <Link className='btn is-honey-suckle is-transparent is-rounded btn-animation group sm:inline-flex space-x-4' to='/user/profile'>
                                            <span>Go to Profile</span>
                                            <img src={profileAvatar} alt="avatar" className="w-10 h-10 rounded-full" />
                                        </Link>
                                    </>

                                    :
                                    <>
                                        <Link className='btn-text hidden text-white hover:text-ColorHoneySuckle sm:inline-block' to='/login'>Login</Link>
                                        <Link className='btn is-honey-suckle is-transparent is-rounded btn-animation group hidden sm:inline-block' to='/signup'><span>Sign up free</span></Link>
                                    </>}
                                {/* <!-- Responsive Offcanvas Menu Button --> */}
                                <div className="block lg:hidden">
                                    <button id="openBtn" className="hamburger-menu mobile-menu-trigger">
                                        <span className="bg-white"></span>
                                        <span className="bg-white"></span>
                                        <span className="bg-white"></span>
                                    </button>
                                </div>
                            </div>
                            {/* <!-- Header User Event --> */}
                        </div>
                    </div>
                </header>
                {/* <!--...::: Header End :::... --> */}

                <main className="main-wrapper relative overflow-hidden">
                    {/* <!--...::: Hero Section Start :::... --> */}
                    <section className="section-hero">
                        {/* <!-- Section Background --> */}
                        <div className="relative z-10 overflow-hidden bg-[#2B13B9]">
                            {/* <!-- Hero Section Space --> */}
                            <div className="pt-28 md:pt-36 lg:pt-[150px] xxl:pt-[185px]">
                                {/* <!-- Section Container --> */}
                                <div className="container-default">
                                    {/* <!-- Hero Area --> */}
                                    <div className="flex flex-col items-center justify-center">
                                        {/* <!-- Hero Content Block --> */}
                                        <div className="text-center">
                                            <div className="jos mx-auto mb-6 max-w-xl lg:max-w-2xl xl:max-w-3xl xxl:max-w-[1076px]">
                                                <h1 className="mb-6 font-PublicSans text-[40px] font-semibold leading-none -tracking-[2px] text-white sm:text-5xl lg:text-6xl xl:text-[76px] xxl:text-[110px]">
                                                    Find the right size in one click.
                                                </h1>
                                            </div>
                                            <div className="jos mx-auto mb-8 max-w-xl text-white lg:mb-[50px] lg:max-w-2xl xl:max-w-3xl xxl:max-w-[896px]">
                                                <p className="mb-8">
                                                    Enter your measurements and preferred fit, and we'll suggest the ideal size for your
                                                    favorite online retailers.
                                                </p>
                                            </div>
                                            <div className="mb-3 flex flex-wrap justify-center gap-6">
                                                <button className="btn is-honey-suckle is-transparent btn-animation is-large is-rounded group inline-block">
                                                    <span>
                                                        $39 for 12 Months.
                                                        <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                                    </span>
                                                </button>
                                                <Link href="#" className="btn is-outline-white btn-animation is-large is-rounded group inline-block"><span>Watch a demo</span></Link>
                                            </div>
                                        </div>
                                        {/* <!-- Hero Content Block --> */}

                                        {/* <!-- Hero Image Block --> */}
                                        <div className="relative mx-auto mt-[60px] max-w-[1296px] overflow-hidden rounded-tl-[10px] rounded-tr-[10px] lg:mt-20 xl:mt-[100px] xxl:mt-[130px]">
                                            <img src={Hero_Img} alt="hero-img" width="1269" height="553" data-jos_animation="zoom-in-down" className="h-auto w-full" />
                                        </div>
                                        {/* <!-- Hero Image Block --> */}
                                    </div>
                                    {/* <!-- Hero Area --> */}
                                </div>
                                {/* <!-- Section Container --> */}
                            </div>
                            {/* <!-- Hero Section Space --> */}

                            {/* <!-- Hero Background Shape --> */}
                            <div className="absolute bottom-0 left-1/2 -z-10 h-auto w-full -translate-x-1/2">
                                <img src={Home_14_Hero_Shape} alt="home-14-hero-shape" width="1600" height="1068" className="h-auto w-full" />
                                {/* <!-- Hero Background Shape --> */}
                            </div>
                        </div>
                        {/* <!-- Section Background --> */}
                    </section>
                    {/* <!--...::: Hero Section End :::... --> */}

                    {/* <!--...::: Features Section Start :::... --> */}
                    <section className="section-features">
                        {/* <!-- Section Space --> */}
                        <div className="section-space">
                            {/* <!-- Section Container --> */}
                            <div className="container-default">
                                {/* <!-- Section Wrapper --> */}
                                <div className="jos mb-[60px] xl:mb-20">
                                    <div className="max-w-[605px]">
                                        {/* <!-- Section Block --> */}
                                        <div className="mb-5">
                                            <h2 className="font-PublicSans text-4xl font-semibold leading-[1.05] -tracking-[2px] text-[#0F1642] sm:text-5xl lg:text-6xl xl:text-[70px] xxl:text-[80px]">
                                                What can it do?
                                            </h2>
                                        </div>
                                        {/* <!-- Section Block --> */}
                                    </div>
                                </div>
                                {/* <!-- Section Wrapper --> */}

                                {/* <!-- Feature List --> */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* <!-- Feature Item --> */}
                                    <div className="jos" data-jos_delay="0">
                                        <div className="relative z-10 h-full rounded-[10px] bg-[#F4F4F4] p-10 transition-all duration-300 hover:bg-ColorHoneySuckle">
                                            <div className="mb-[60px] max-w-[376px] lg:mb-20 xl:mb-[127px]">
                                                <div className="mb-4 font-PublicSans text-2xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Size Recomendation
                                                </div>
                                                <p className="text-xl text-[#0F1642]/80">
                                                    Should you order Medium, or Large?
                                                    We can help you with that.
                                                </p>
                                            </div>
                                            <Link href="#" className="text-2xl text-[#0F1642]">
                                                <span><i className="fa-regular fa-arrow-right"></i></span>
                                            </Link>

                                            <div className="absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 xl:inline-block">
                                                <img src={Features_img_1} alt="features-img-1" width="280" height="211" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Feature Item --> */}
                                    {/* <!-- Feature Item --> */}
                                    <div className="jos" data-jos_delay="0.3">
                                        <div className="relative z-10 h-full rounded-[10px] bg-[#F4F4F4] p-10 transition-all duration-300 hover:bg-ColorHoneySuckle">
                                            <div className="mb-[60px] max-w-[376px] lg:mb-20 xl:mb-[127px]">
                                                <div className="mb-4 font-PublicSans text-2xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Email Notification
                                                </div>
                                                <p className="text-xl text-[#0F1642]/80">
                                                    Check your inbox,
                                                    your item is back in stock!
                                                </p>
                                            </div>
                                            <Link href="#" className="text-2xl text-[#0F1642]">
                                                <span><i className="fa-regular fa-arrow-right"></i></span>
                                            </Link>

                                            <div className="absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 xl:inline-block">
                                                <img src={Features_img_2} alt="features-img-2" width="280" height="228" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Feature Item --> */}
                                    {/* <!-- Feature Item --> */}
                                    <div className="jos md:col-span-2" data-jos_delay="0.6">
                                        <div className="relative z-10 h-full rounded-[10px] bg-[#F4F4F4] p-10 transition-all duration-300 hover:bg-ColorHoneySuckle">
                                            <div className="mb-[60px] max-w-[486px] lg:mb-20 xl:mb-[127px]">
                                                <div className="mb-4 font-PublicSans text-2xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Stock Watch
                                                </div>
                                                <p className="text-xl text-[#0F1642]/80">
                                                    When will this item be back in stock?
                                                    check your inbox, we've been watching it for you!
                                                </p>
                                            </div>
                                            <Link href="#" className="text-2xl text-[#0F1642]">
                                                <span><i className="fa-regular fa-arrow-right"></i></span>
                                            </Link>

                                            <div className="absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 xl:inline-block">
                                                <img src={Features_img_3} alt="features-img-3" width="462" height="336" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Feature Item --> */}
                                </div>
                                {/* <!-- Feature List --> */}
                            </div>
                            {/* <!-- Section Container --> */}
                        </div>
                        {/* <!-- Section Space --> */}
                    </section>
                    {/* <!--...::: Features Section End :::... --> */}

                    {/* <!--...::: Pricing Section Start :::... --> */}
                    <section className="section-pricing">
                        {/* <!-- Section Space --> */}
                        <div className="section-space-bottom">
                            {/* <!-- Section Container --> */}
                            <div className="container-default">
                                {/* <!-- Section Wrapper --> */}
                                <div className="jos mb-[60px] xl:mb-20">
                                    <div className="max-w-[636px]">
                                        {/* <!-- Section Block --> */}
                                        <div className="mb-5">
                                            <h2 className="font-PublicSans text-4xl font-semibold leading-[1.05] -tracking-[2px] text-[#0F1642] sm:text-5xl lg:text-6xl xl:text-[70px] xxl:text-[80px]">
                                                Plans to increase getting the right size
                                            </h2>
                                        </div>
                                        {/* <!-- Section Block --> */}
                                    </div>
                                </div>
                                {/* <!-- Section Wrapper --> */}

                                {/* <!-- Price List --> */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {/* <!-- Price Item --> */}
                                    <div className="jos" data-jos_animation="flip-left">
                                        <div className="h-full rounded-[10px] border-2 border-[#F4F4F4] bg-white p-8 lg:p-10">
                                            {/* <!-- Pricing Content Top --> */}
                                            <div className="flex items-center justify-between gap-y-10">
                                                <div className="font-PublicSans text-3xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Basic
                                                    <span className="mt-1 block font-body text-base leading-[1.5]">
                                                        Per Month
                                                    </span>
                                                </div>
                                                <span className="block font-PublicSans text-5xl font-bold text-[#0F1642] lg:text-6xl">Free</span>
                                            </div>
                                            {/* <!-- Pricing Content Top --> */}
                                            {/* <!-- Horizontal Line Separator --> */}
                                            <div className="my-[30px] h-px w-full bg-[#F4F4F4]"></div>
                                            {/* <!-- Horizontal Line Separator --> */}
                                            {/* <!-- Pricing Data list --> */}
                                            <ul className="mb-10 flex flex-col gap-y-4 text-base font-semibold text-[#0F1642]">
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Pro Chat Support
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    General Sales and Discount Offers
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Generate 1 Stock Watch
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Generate 1 Size Recommendation
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-regular fa-circle-check"></i></span>
                                                    Dependents
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-regular fa-circle-check"></i></span>
                                                    Email Notification
                                                </li>
                                            </ul>
                                            {/* <!-- Pricing Data list --> */}

                                            <Link to="/signup"
                                                className="btn is-honey-suckle-2 is-transparent btn-animation is-large is-rounded group block w-full">
                                                Get started now
                                                <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* <!-- Price Item --> */}
                                    {/* <!-- Price Item --> */}
                                    <div className="jos" data-jos_animation="flip-left">
                                        <div className="h-full rounded-[10px] border-2 border-[#F4F4F4] bg-white p-8 lg:p-10">
                                            {/* <!-- Pricing Content Top --> */}
                                            <div className="flex items-center justify-between gap-y-10">
                                                <div className="font-PublicSans text-3xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Annual
                                                    <span className="mt-1 block font-body text-base leading-[1.5]">
                                                        Per Year
                                                    </span>
                                                </div>
                                                <span className="block font-PublicSans text-3xl font-bold text-[#0F1642] lg:text-[35px]">$39</span>
                                                {/* <span className="block font-PublicSans text-5xl font-bold text-[#0F1642] lg:text-6xl">{paymentPrices.yearly} ZAR</span> */}
                                            </div>
                                            {/* <!-- Pricing Content Top --> */}
                                            {/* <!-- Horizontal Line Separator --> */}
                                            <div className="my-[30px] h-px w-full bg-[#F4F4F4]"></div>
                                            {/* <!-- Horizontal Line Separator --> */}
                                            {/* <!-- Pricing Data list --> */}
                                            <ul className="mb-10 flex flex-col gap-y-4 text-base font-semibold text-[#0F1642]">
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Pro Chat Support
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Exclusive Sales and Discount Offers
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Up to 5 Stock Watch
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Unlimited Size Recommendations
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Up to 5 Dependents
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Email Notification
                                                </li>
                                            </ul>
                                            {/* <!-- Pricing Data list --> */}

                                            <button
                                                className="btn is-honey-suckle-2 is-transparent btn-animation is-large is-rounded group block w-full">
                                                Get started now
                                                <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* <!-- Price Item --> */}
                                    {/* <!-- Price Item --> */}
                                    <div className="jos" data-jos_animation="flip-left">
                                        <div className="h-full rounded-[10px] border-2 border-[#F4F4F4] bg-white p-8 lg:p-10">
                                            {/* <!-- Pricing Content Top --> */}
                                            <div className="flex items-center justify-between gap-y-10">
                                                <div className="font-PublicSans text-3xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                    Monthly
                                                    <span className="mt-1 block font-body text-base leading-[1.5]">
                                                        Per Month
                                                    </span>
                                                </div>
                                                <span className="block font-PublicSans text-3xl font-bold text-[#0F1642] lg:text-[35px]">$13</span>
                                            </div>
                                            {/* <!-- Pricing Content Top --> */}
                                            {/* <!-- Horizontal Line Separator --> */}
                                            <div className="my-[30px] h-px w-full bg-[#F4F4F4]"></div>
                                            {/* <!-- Horizontal Line Separator --> */}
                                            {/* <!-- Pricing Data list --> */}
                                            <ul className="mb-10 flex flex-col gap-y-4 text-base font-semibold text-[#0F1642]">
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Pro Chat Support
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Exclusive Sales and Discount Offers
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Up to 5 Stock Watch
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Unlimited Size Recommendations
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Up to 5 Dependents
                                                </li>
                                                <li className="flex items-center gap-x-3">
                                                    <span className="text-[22px]"><i className="fa-solid fa-circle-check"></i></span>
                                                    Email Notification
                                                </li>
                                            </ul>
                                            {/* <!-- Pricing Data list --> */}

                                            <button
                                                className="btn is-honey-suckle-2 is-transparent btn-animation is-large is-rounded group block w-full">
                                                Get started now
                                                <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* <!-- Price Item --> */}
                                </div>
                                {/* <!-- Price List --> */}
                            </div>
                            {/* <!-- Section Container --> */}
                        </div>
                        {/* <!-- Section Space --> */}
                    </section>
                    {/* <!--...::: Pricing Section End :::... --> */}

                    {/* <!--...::: FAQs Section Start :::... --> */}

                    <section className="section-faqs">
                        <div className="section-space-bottom">
                            <div className="container-default">
                                {/* write the Frequently Asked Questions here according to the design */}

                                <div className="jos mb-[50px] xl:mb-20">
                                    <div className="max-w-[636px]">
                                        <div className="mb-5">
                                            <h2 className="font-PublicSans text-4xl font-semibold leading-[1.05] -tracking-[2px] text-[#0F1642] sm:text-5xl lg:text-6xl xl:text-[70px] xxl:text-[80px]">
                                                Frequently Asked Questions
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {/* <!-- FAQ Item --> */}
                                    {/* loop through the faqs array and display each faq use, the toggleFaq function to toggle the visibility of the faq, and the expandedIndex to determine if the faq is expanded or not
                            use animate presence to animate the faq item when it is toggled */}
                                    {faqs.map((faq, index) => (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="jos" data-jos_animation="flip-left">
                                                <div className="h-full rounded-[10px] border-2 border-[#F4F4F4] bg-white p-2">
                                                    {/* FAQ Header */}
                                                    <div
                                                        onClick={() => toggleFaq(index)}
                                                        className="flex cursor-pointer items-center justify-between gap-y-2 z-10 h-full rounded-[10px] p-6 transition-all duration-300 hover:bg-ColorHoneySuckle"
                                                    >
                                                        <div className="font-PublicSans text-3xl font-semibold leading-[1.2] text-[#0F1642] lg:text-[35px]">
                                                            {faq.question}
                                                        </div>
                                                        <motion.div
                                                            className="text-2xl text-[#0F1642]"
                                                            animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        >
                                                            <i
                                                                className={`fa-regular fa-${expandedIndex === index ? 'minus' : 'plus'
                                                                    }`}
                                                            ></i>
                                                        </motion.div>
                                                    </div>

                                                    {/* Separator */}
                                                    {/* <div className="py-2 h-px w-full bg-[#F4F4F4]"></div> */}

                                                    {/* FAQ Body */}
                                                    <AnimatePresence initial={false}>
                                                        {expandedIndex === index && (
                                                            <motion.div
                                                                className="overflow-hidden"
                                                                key="content"
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    ease: 'easeInOut',
                                                                }}
                                                            >
                                                                <div className="text-base font-semibold text-[#0F1642] p-6">
                                                                    {faq.answer}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </section>


                    {/* <!--...::: FAQs Section End :::... --> */}


                    {/* <!--...::: Contact Form Start :::... --> */}
                        <section className="section-contact" id="contact">
                            <div className="section-space-bottom">
                                <div className="container-default">
                                    <div className="jos mb-[50px] xl:mb-20">
                                        <div className="max-w-[636px]">
                                            <div className="mb-5">
                                                <h2 className="font-PublicSans text-4xl font-semibold leading-[1.05] -tracking-[2px] text-[#0F1642] sm:text-5xl lg:text-6xl xl:text-[70px] xxl:text-[80px]">
                                                    Contact Us
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-6 ">
                                        <div className="flex flex-col">
                                            <label htmlFor="name" className="font-PublicSans text-xl font-semibold text-[#0F1642]">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={contactForm.name}
                                                onChange={handleContactChange}
                                                className="mt-2 p-4 rounded-[10px] border-b-2 border-[#0F1642] bg-white"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="email" className="font-PublicSans text-xl font-semibold text-[#0F1642]">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={contactForm.email}
                                                onChange={handleContactChange}
                                                className="mt-2 p-4 rounded-[10px] border-b-2 border-[#0F1642] bg-white"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="message" className="font-PublicSans text-xl font-semibold text-[#0F1642]">Message</label>
                                            <textarea
                                                name="message"
                                                value={contactForm.message}
                                                onChange={handleContactChange}
                                                className="mt-2 p-4 rounded-[10px] border-b-2 border-[#0F1642] bg-white"
                                                rows="5"
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn is-honey-suckle-2 is-transparent btn-animation is-large is-rounded group block w-full"
                                        >
                                            Send Message
                                            <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    {/* <!--...::: Contact Form End :::... --> */}


                    {/* <!-- Horizontal Text Slider --> */}
                    <div className="overflow-hidden bg-[#2B13B9] py-5 font-Sora text-3xl font-semibold leading-[1.4] tracking-[1px] text-ColorHoneySuckle">
                        {/* <!-- Horizontal Slider Block--> */}
                        <div className="horizontal-slide-from-right-to-left flex gap-x-[30px]">
                            <span className="flex whitespace-nowrap">Size Recommendation </span>
                            <img src={Icon_Honey_Suckle_Star} alt="star-of-life" width="37" height="35" />
                            <span className="flex whitespace-nowrap">Stock Watch </span>
                            <img src={Icon_Honey_Suckle_Star} alt="star-of-life" width="37" height="35" />
                            <span className="flex whitespace-nowrap">Add Dependents </span>
                            <img src={Icon_Honey_Suckle_Star} alt="star-of-life" width="37" height="35" />
                            <span className="flex whitespace-nowrap">Premium chat support </span>
                            <img src={Icon_Honey_Suckle_Star} alt="star-of-life" width="37" height="35" />
                            <span className="flex whitespace-nowrap">Email Notification </span>
                        </div>
                        {/* <!-- Horizontal Slider Block--> */}
                    </div>
                    {/* <!-- Horizontal Text Slider --> */}

                </main>

                {/* <!--...::: Footer Section Start :::... --> */}
                <footer className="section-footer">
                    <div className="relative z-10 bg-[#2B13B9]">
                        {/* <!-- Footer Area Top --> */}
                        <div className="py-20 lg:py-[100px] xl:pb-[100px] xl:pt-[130px]">
                            <div className="container-default">
                                <div className="flex flex-wrap items-center text-center xxl:text-left justify-center xxl:justify-between gap-10">
                                    <div className="max-w-[695px]">
                                        <h2 className="font-PublicSans text-4xl font-semibold leading-[1.05] -tracking-[2px] text-white sm:text-5xl lg:text-6xl xl:text-[70px] xxl:text-[80px]">
                                            Ready to get the right size
                                        </h2>
                                    </div>
                                    <div className="mb-3 flex flex-wrap justify-center gap-6">
                                        <Link to="/signup" className="btn is-honey-suckle is-transparent btn-animation is-large is-rounded group inline-block">
                                            <span>
                                                Get started— it's free
                                                <i className="fa-regular fa-arrow-right ml-[10px] text-2xl leading-none"></i>
                                            </span>
                                        </Link>
                                        {/* <ScrollLink to="contact" smooth={true} duration={500}
                                            className="btn is-outline-white btn-animation is-large is-rounded group inline-block">
                                            <span>Ask us questions</span>
                                        </ScrollLink> */}
                                        <button
        onClick={scrollToContact}
        className="btn is-outline-white btn-animation is-large is-rounded group inline-block"
      >
        Ask us questions
      </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Footer Area Top --> */}
                        {/* <!-- Footer Area Center --> */}
                        <div className="text-white/80">
                            {/* <!-- Footer Center Spacing --> */}
                            <div className="pb-[60px] lg:pb-20">
                                {/* <!-- Section Container --> */}
                                <div className="container-default">
                                    {/* <!-- Footer Widget List --> */}
                                    <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_repeat(3,_auto)] xl:gap-x-20 xxl:gap-x-32">
                                        {/* <!-- Footer Widget Item --> */}
                                        <div className="flex flex-col gap-y-7 md:col-span-3 lg:col-span-1">
                                            {/* <!-- Footer Logo --> */}
                                            {/* top scrollbar */}
                                            <button onClick={() => window.scrollTo(0, 0)}>
                                                <img src={SizeYami_Light} alt="SizeYami" width="109" height="24" />
                                            </button>
                                            {/* <!-- Footer Content --> */}
                                            <div>
                                                {/* <!-- Footer About Text --> */}
                                                <div className="lg:max-w-[460px]">
                                                    SizeYami takes the guesswork out of shopping.
                                                </div>
                                                {/* <!-- Footer Content --> */}
                                                <div className="mt-10">
                                                    &copy; Copyright 2024, All Rights Reserved by SizeYami
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Section Container  */}
                                </div>
                                {/* Footer Center Spacing  */}
                            </div>
                            {/* Footer Area Center */}
                            {/* Footer Background Shape  */}
                            <div className="absolute bottom-0 left-1/2 -z-10 h-auto w-full -translate-x-1/2">
                                <img src={Home14_Footer_Shape} alt="home-14-hero-shape" width="1600" height="510" className="h-auto w-full" />
                            </div>
                            {/* <form name="PayFastPayNowForm" action="https://payment.payfast.io/eng/process" method="post">
                    <input required type="hidden" name="cmd" value="_paynow"/>
                    <input required type="hidden" name="receiver" pattern="[0-9]" value="11617250"/>
                    <input type="hidden" name="return_url" value="https://webhook.site/fb8b7d04-6e2f-4b57-ab8f-01e8a17bfd8d"/>
                    <input type="hidden" name="cancel_url" value="http://localhost:3000/boopy"/>
                    <input type="hidden" name="notify_url" value="https://webhook.site/fb8b7d04-6e2f-4b57-ab8f-01e8a17bfd8d"/>
                    <input required type="hidden" name="amount" value={formValues.amount}/>
                    <input required type="hidden" name="item_name" maxlength="255" value={formValues.item_name}/>
                    <input type="hidden" name="name_first" value={profile ? profile.first_name : ''}/>
                    <input type="hidden" name="name_last" value={profile ? profile.last_name : ''}/>
                    <input type="hidden" name="email_address" value={profile ? profile.user.email : ''}/>
                    <input type="hidden" name="custom_str1" value={profile ? profile.user.username : ''}/>
                    <input type="hidden" name="custom_int1" value={formValues.duration}/>
                    <table>
                        <tr>
                            <td>
                                <input type="hidden" alt="Pay Now" id="pay_button"/>
                            </td>
                        </tr>
                    </table>
                </form> */}
                            {/* Footer Background Shape */}
                        </div>
                    </div>
                </footer>
                {/* ...::: Footer Section End :::... */}
            </div>

        </div>
    )
}