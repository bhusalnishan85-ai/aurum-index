import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export { gsap, ScrollTrigger, Flip, Observer };
