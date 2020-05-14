import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { HomeFadeInOut } from '../fade';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    @Input() active: string = 'home';
    @Output() onMenuChange: EventEmitter<string> = new EventEmitter();
    constructor() {}

    public ngOnInit(): void {
        new HomeFadeInOut().show('header', null, 1.8, 3.6);
    }

    public scrollTo(fragment): void {
        this.onMenuChange.emit(fragment);
    }
}
