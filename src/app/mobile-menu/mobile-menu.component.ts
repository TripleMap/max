import {
    Component,
    OnInit,
    EventEmitter,
    Input,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { HomeFadeInOut } from '../fade';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnInit {
    @Input() active: string = 'home';
    @Output() onMenuChange: EventEmitter<string> = new EventEmitter();

    public menuVisible: boolean = false;
    constructor(private cdr: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const menu = document.getElementById('mobile-menu');
        menu.style.zIndex = '0';
        new HomeFadeInOut().hide('mobile-menu', 0, 0, 0);
        new HomeFadeInOut().show('mobile-header', null, 0, 0);
    }

    public scrollTo(fragment): void {
        this.menuVisible = false;
        new HomeFadeInOut().hide('mobile-menu', 0, 0, 0.375);

        const menu = document.getElementById('mobile-menu');
        setTimeout(() => {
            menu.style.zIndex = '0';
        }, 0.375);

        this.cdr.detectChanges();
        this.onMenuChange.emit(fragment);
    }

    public toggleMenu() {
        this.menuVisible = !this.menuVisible;
        const menu = document.getElementById('mobile-menu');
        if (this.menuVisible) {
            new HomeFadeInOut().show('mobile-menu', 0, 0, 0.375);
            menu.style.zIndex = '1000';
        } else {
            new HomeFadeInOut().hide('mobile-menu', 0, 0, 0.375);
            setTimeout(() => {
                menu.style.zIndex = '0';
            }, 0.375);
        }
    }

    public hideMenu() {
        this.menuVisible = false;
        const menu = document.getElementById('mobile-menu');
        new HomeFadeInOut().hide('mobile-menu', 0, 0, 0.375);
        setTimeout(() => {
            menu.style.zIndex = '0';
        }, 0.375);
    }
}
