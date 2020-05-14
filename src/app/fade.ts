import { TweenLite, Cubic } from 'gsap/all';

export class HomeFadeInOut {
    constructor() {}
    public show(selectorId, delayFrom = 0, delayTo = 0, time?) {
        const item = document.getElementById(selectorId);
        if (!item) return;
        TweenLite.fromTo(
            item,
            time ? time : 3,
            {
                opacity: 0,
                delay: delayFrom,
            },
            {
                opacity: 1,
                ease: Cubic.easeOut,
                delay: delayTo,
            }
        );
    }

    public hide(selectorId, delayFrom = 0, delayTo = 0, time?) {
        const item = document.getElementById(selectorId);
        if (!item) return;
        TweenLite.fromTo(
            item,
            time ? time : 0.375,
            {
                opacity: 1,
                delay: delayFrom,
            },
            {
                opacity: 0,
                ease: Cubic.easeOut,
                delay: delayTo,
            }
        );
    }

    public hideCurtain(selectorId, delayFrom = 0, delayTo = 0, time?) {
        const item = document.getElementById(selectorId);
        TweenLite.fromTo(
            item,
            time ? time : 0.8,
            {
                zIndex: 1000,
                opacity: 1,
                delay: delayFrom,
            },
            {
                zIndex: -1,
                opacity: 0,
                ease: Cubic.easeOut,
                delay: delayTo,
            }
        );
    }
}
