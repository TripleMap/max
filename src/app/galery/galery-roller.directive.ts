import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { gsap, ScrollToPlugin, Cubic } from 'gsap/all';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
gsap.registerPlugin(ScrollToPlugin);

@Directive({
    selector: '[appGaleryRoller]',
})
export class GaleryRollerDirective {
    @HostListener('click', ['$event']) click(e: MouseEvent) {
        if ((e.srcElement as any).classList.contains('after')) {
            this.next();
        }
        if ((e.srcElement as any).classList.contains('before')) {
            this.prev();
        }
    }

    @HostListener('touchstart', ['$event']) touchStart(e: TouchEvent) {
        e.stopPropagation();
        e.preventDefault();

        this.sX = e.touches[0].screenX;
        this.sY = e.touches[0].screenY;
    }

    @HostListener('touchmove', ['$event']) touchMove(e: TouchEvent) {
        e.stopPropagation();
        e.preventDefault();

        var t = e.touches[0];
        this.eX = t.screenX;
        this.eY = t.screenY;
    }

    @HostListener('touchend', ['$event']) touchEnd(e: TouchEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (
            (this.eX - this.min_x > this.sX || this.eX + this.min_x < this.sX) &&
            this.eY < this.sY + this.max_y &&
            this.sY > this.eY - this.max_y &&
            this.eX > 0
        ) {
            this.direc = this.eX > this.sX ? 'r' : 'l';
        } else if (
            (this.eY - this.min_y > this.sY || this.eY + this.min_y < this.sY) &&
            this.eX < this.sX + this.max_x &&
            this.sX > this.eX - this.max_x &&
            this.eY > 0
        ) {
            this.direc = this.eY > this.sY ? 'd' : 'u';
        }

        if (this.direc != '') this.galeryMove(this.direc);

        this.direc = '';
        this.sX = 0;
        this.sY = 0;
        this.eX = 0;
        this.eY = 0;
    }

    @HostListener('wheel', ['$event'])
    wait(e: any) {
        e.stopPropagation();
        e.preventDefault();
        e.deltaY > 0 ? this.next() : this.prev();
    }

    @HostListener('document:keydown', ['$event']) keyPress(e: any) {
        e.stopPropagation();
        e.preventDefault();
        if (window['activePage'] !== 'galery') return;
        if (window['imageViewer']) return;
        if (e.keyCode === 39) {
            this.next();
        }
        if (e.keyCode === 37) {
            this.prev();
        }
    }

    private sX = 0;
    private sY = 0;
    private eX = 0;
    private eY = 0;
    private min_x = 30;
    private max_x = 30;
    private min_y = 50;
    private max_y = 60;
    private direc = '';

    public activeImage: string;

    public _imageList: string[];
    @Input('appGaleryRoller') set imageList(data: string[]) {
        this._imageList = data;
        this.activeImage = data[0];
    }
    get imageList() {
        return this._imageList;
    }

    private counter = 0;
    private showGalery: Subject<boolean> = new Subject();

    @Output() reach: EventEmitter<{
        start: boolean;
        end: boolean;
    }> = new EventEmitter();

    constructor() {
        this.showGalery.pipe(debounceTime(40)).subscribe((direction) => this.showGaleryItem(direction));
    }

    private galeryMove = (d): void => (d === 'l' || d === 'u' ? this.next() : this.prev());

    private next(): void {
        this.showGalery.next(true);
    }

    private prev(): void {
        this.showGalery.next(false);
    }

    private showGaleryItem(direction): void {
        gsap.to(document.getElementById('galery-wrapper'), {
            duration: 0.4,
            scrollTo: { x: `${direction ? '+=500' : '-=500'}` },
            ease: Cubic.easeOut,
        });
    }
}
